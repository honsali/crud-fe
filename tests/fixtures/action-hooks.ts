import { mock } from 'bun:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><div id="root"></div>', { url: 'http://localhost/' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, IS_REACT_ACT_ENVIRONMENT: true });
const React = require('react');
const { act, createElement: h } = React;
const { createRoot } = require('react-dom/client');
const { configureStore } = require('@reduxjs/toolkit');
const { Provider, useDispatch } = require('react-redux');
const { MemoryRouter, Routes, Route, useNavigate } = require('react-router');

const etats = await import('../../src/waxant/noyau/redux/EtatMdl');
const { default: action } = await import('../../src/waxant/noyau/redux/action');
const { default: messageReducer } = await import('../../src/waxant/noyau/message/MdlMessage');
const { default: util } = await import('../../src/waxant/noyau/util/util');
mock.module('waxant', () => ({ ...etats, action, util, useAppDispatch: useDispatch }));

const lists: any[] = [];
const reads: any[] = [];
const updates: any[] = [];
const filters: any[] = [];
const pending = (calls: any[], ...args: unknown[]) =>
    new Promise((resolve, reject) => calls.push({ args, resolve, reject }));
mock.module('modele/rh/departement/ServiceDepartement', () => ({
    default: { lister: () => pending(lists) },
}));
mock.module('modele/rh/conge/ServiceConge', () => ({
    default: {
        recupererParId: (id: string) => pending(reads, id),
        maj: (request: unknown) => pending(updates, request),
    },
}));
mock.module('modele/rh/employe/ServiceEmploye', () => ({
    default: { filtrer: (filtre: unknown, page = 0) => pending(filters, filtre, page) },
}));

const { useListerDepartement } = await import('../../src/modules/rh/departement/lister/useListerDepartement');
const { default: listReducer } = await import('../../src/modules/rh/departement/lister/MdlListerDepartement');
const { useInitModificationConge, useMajConge } = await import('../../src/modules/rh/employe/conge/modifier/useModifierConge');
const { default: modificationReducer } = await import('../../src/modules/rh/employe/conge/modifier/MdlModifierConge');
const { useFiltrerEmploye, useInitialiserFiltrerEmploye, useChangerPageFiltrerEmploye } = await import('../../src/modules/rh/employe/filtrer/useFiltrerEmploye');
const { default: filterReducer } = await import('../../src/modules/rh/employe/filtrer/MdlFiltrerEmploye');
const store = configureStore({ reducer: {
    mdlMessage: messageReducer,
    mdlListerDepartement: listReducer,
    mdlModifierConge: modificationReducer,
    mdlFiltrerEmploye: filterReducer,
} });
const counts = { list: 0, init: 0, command: 0, filter: 0, table: 0 };
let list: any, initialization: any, command: any, filter: any, reset: any, table: any, navigate: any;
function ListProbe() { counts.list++; list = useListerDepartement(); return null; }
function InitProbe() { counts.init++; initialization = useInitModificationConge(); return null; }
function CommandProbe() { counts.command++; command = useMajConge(); return null; }
function FilterProbe() {
    counts.filter++;
    filter = useFiltrerEmploye();
    reset = useInitialiserFiltrerEmploye();
    return null;
}
function TableProbe() { counts.table++; table = useChangerPageFiltrerEmploye(); return null; }
function RouterProbe() {
    navigate = useNavigate();
    return h(Routes, null, h(Route, {
        path: '/edit/:idEmploye/:idConge',
        element: h(React.Fragment, null, h(ListProbe), h(InitProbe), h(CommandProbe), h(FilterProbe), h(TableProbe)),
    }));
}
const root = createRoot(document.getElementById('root'));
const page = (id: string, pageCourante = 0) => ({ liste: [{ id }], pagination: { pageCourante } });

try {
    // No StrictMode: these assertions measure the ordinary lifecycle, not its dev replay.
    await act(async () => root.render(h(Provider, { store },
        h(MemoryRouter, { initialEntries: ['/edit/10/20'] }, h(RouterProbe)))));
    assert.equal(lists.length, 1);
    assert.deepEqual(reads.map(call => call.args), [['20']]);
    assert.deepEqual(filters.map(call => call.args), [[{}, 0]]);
    assert.equal(updates.length, 0, 'commands must not execute on mount');
    assert.deepEqual(Object.keys(list), ['listeDepartement']);
    assert.deepEqual(Object.keys(filter), ['filtrerEmploye']);
    const beforeData = { ...counts };
    await act(async () => {
        lists[0].resolve([{ id: '1', nom: 'RH' }]);
        reads[0].resolve({ id: '20', code: 'CONGE' });
        filters[0].resolve(page('100'));
    });
    assert.equal(counts.command, beforeData.command);
    assert.equal(counts.filter, beforeData.filter);
    assert.equal(list.listeDepartement[0].id, '1');
    assert.equal(initialization.conge.id, '20');
    assert.equal(table.listePagineeEmploye.liste[0].id, '100');

    const beforeCommand = { ...counts };
    const stableCommand = command.majConge;
    let result: any;
    await act(async () => {
        result = command.majConge({ form: { validateFields: async () => ({ id: '20', code: 'MODIF' }) } });
    });
    assert.deepEqual(updates[0].args, [{ id: '20', code: 'MODIF' }]);
    assert.equal(command.majConge, stableCommand);
    assert.equal(counts.init, beforeCommand.init, 'saving must not rerender the form initializer');
    await act(async () => { updates[0].resolve(undefined); await result; });
    assert.equal(command.etatMajConge.succes, true);
    await act(async () => command.resetEtatMajConge());
    assert.equal(command.etatMajConge.succes, false);
    assert.equal(counts.init, beforeCommand.init);

    await act(async () => { result = filter.filtrerEmploye({ form: { getFieldsValue: () => ({ nom: 'Dupont' }) } }); });
    assert.deepEqual(filters[1].args, [{ nom: 'Dupont' }, 0]);
    await act(async () => { filters[1].resolve(page('101')); await result; });
    await act(async () => { result = table.changerPageFiltrerEmploye({ pageCourante: 2 }); });
    assert.deepEqual(filters[2].args, [{ nom: 'Dupont' }, 2]);
    await act(async () => { filters[2].resolve(page('102', 2)); await result; });
    await act(async () => { result = reset.initialiserFiltrerEmploye(); });
    assert.deepEqual(filters[3].args, [{}, 0]);
    await act(async () => { filters[3].resolve(page('100')); await result; });
    assert.equal(counts.filter, beforeData.filter, 'list/status updates must not rerender the filter form');
    assert.deepEqual(store.getState().mdlFiltrerEmploye.filtre, {});

    await act(async () => navigate('/edit/11/20?tab=detail'));
    assert.equal(reads.length, 1, 'an unused parent parameter must not reload the same leave record');
    await act(async () => navigate('/edit/11/21'));
    assert.deepEqual(reads.map(call => call.args), [['20'], ['21']]);
    await act(async () => reads[1].resolve({ id: '21', code: 'AUTRE' }));
    assert.equal(initialization.conge.id, '21');
    assert.equal(lists.length, 1);
    assert.equal(filters.length, 4);
    assert.deepEqual(store.getState().mdlMessage.actionEnCours, {});
} finally {
    await act(async () => root.unmount());
    dom.window.close();
}
