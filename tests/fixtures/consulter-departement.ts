import { mock } from 'bun:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const project = fileURLToPath(new URL('../../', import.meta.url));
const uc = `${project}src/modules/rh/departement/consulter`;
const require = createRequire(import.meta.url);
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><div id="root"></div>', { url: 'http://localhost/' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, IS_REACT_ACT_ENVIRONMENT: true });
const React = require('react');
const { createRoot } = require('react-dom/client');
const { configureStore } = require('@reduxjs/toolkit');
const { Provider, useDispatch } = require('react-redux');
const { MemoryRouter, Routes, Route, useLocation, useNavigate } = require('react-router');
const { act } = React;
const h = React.createElement;

const counts = { view: 0, form: 0, modifier: 0, supprimer: 0, shared: 0 };
const readings: any[] = [];
const deletions: any[] = [];
let deleteProps: any;
let sharedRead: any;
let navigate: any;
let pathname = '';
let navigationCount = 0;
const pendingRequest = (id: string, requests: any[]) =>
    new Promise((resolve, reject) => requests.push({ id, resolve, reject }));

const etats = await import('../../src/waxant/noyau/redux/EtatMdl');
const { default: action } = await import('../../src/waxant/noyau/redux/action');
const { default: messageReducer } = await import('../../src/waxant/noyau/message/MdlMessage');
const { default: useGoToPage } = await import('../../src/waxant/noyau/routes/useGoToPage');
const layout = ({ children }: any) => h('div', null, children);
mock.module('waxant', () => ({
    ...etats,
    action,
    useAppDispatch: useDispatch,
    useGoToPage: () => {
        const go = useGoToPage();
        return (...args: Parameters<typeof go>) => { navigationCount++; go(...args); };
    },
    Section: ({ children }: any) => { counts.view++; return h('section', null, children); },
    Bloc: layout,
    BlocAction: layout,
    FormulaireConsultation: ({ modele }: any) => {
        counts.form++;
        return h('p', { 'data-departement': modele?.id }, modele?.nom);
    },
    Texte: () => null,
    ActionUcModifier: () => { counts.modifier++; return null; },
    ActionUcRetourListe: () => null,
    ActionUcSupprimer: (props: any) => {
        counts.supprimer++;
        deleteProps = props;
        return h('button', { onClick: props.action }, 'Supprimer');
    },
}));
mock.module('modele/rh/departement/ServiceDepartement', () => ({
    default: {
        recupererParId: (id: string) => pendingRequest(id, readings),
        supprimer: (id: string) => pendingRequest(id, deletions),
    },
}));
mock.module(`${project}src/modules/rh/departement/ListePageDepartement.tsx`, () => ({
    PageListerDepartement: { toPath: () => '/list' },
    PageModifierDepartement: { toPath: ({ idDepartement }: any) => `/edit/${idDepartement}` },
}));

const { default: View } = await import(`${uc}/ViewConsulterDepartement.tsx`);
const { default: reducer } = await import(`${uc}/MdlConsulterDepartement.ts`);
const { useRecupererDepartementParId } = await import(`${uc}/useConsulterDepartement.ts`);
const store = configureStore({
    reducer: {
        mdlConsulterDepartement: reducer,
        mdlMessage: messageReducer,
        unrelated: (state = 0, event: any) => event.type === 'unrelated' ? state + 1 : state,
    },
});
function SharedReadProbe() {
    counts.shared++;
    sharedRead = useRecupererDepartementParId();
    return h('p', { 'data-shared': true }, sharedRead.departement?.nom);
}
function RouterProbe() {
    navigate = useNavigate();
    pathname = useLocation().pathname;
    return h(Routes, null,
        h(Route, {
            path: '/consult/:idDepartement',
            element: h(React.Fragment, null, h(View), h(SharedReadProbe)),
        }),
        h(Route, { path: '/list', element: h('p', null, 'Liste') }));
}
const root = createRoot(document.getElementById('root'));
const snapshot = () => ({ ...counts });
const idleSpinner = () => assert.deepEqual(store.getState().mdlMessage.actionEnCours, {});

try {
    await act(async () => root.render(h(Provider, { store },
        h(MemoryRouter, { initialEntries: ['/consult/101'] }, h(RouterProbe)))));
    assert.deepEqual(readings.map(r => r.id), ['101']);
    const initialCounts = snapshot();
    const initialRead = sharedRead.recupererDepartementParId;
    const initialReset = sharedRead.resetEtatRecupererDepartementParId;
    const initialDelete = deleteProps.action;

    await act(async () => readings[0].resolve({ id: '101', nom: 'RH' }));
    assert.equal(document.querySelector('[data-departement]')?.textContent, 'RH');
    assert.equal(document.querySelector('[data-shared]')?.textContent, 'RH');
    assert.equal(sharedRead.departement, store.getState().mdlConsulterDepartement.departement);
    assert.equal(counts.view, initialCounts.view);
    assert.equal(counts.modifier, initialCounts.modifier);
    assert.equal(counts.supprimer, initialCounts.supprimer);
    assert.equal(sharedRead.recupererDepartementParId, initialRead);
    assert.equal(sharedRead.resetEtatRecupererDepartementParId, initialReset);
    assert.equal(readings.length, 1, 'sharing the hook must not trigger a second HTTP request');
    idleSpinner();

    const beforeUnrelated = snapshot();
    await act(async () => store.dispatch({ type: 'unrelated' }));
    assert.deepEqual(counts, beforeUnrelated);

    const beforeDelete = snapshot();
    let deletion: any;
    await act(async () => { deletion = deleteProps.action(); });
    assert.equal(deletions[0].id, '101');
    assert.ok(deleteProps.rid);
    assert.equal(deleteProps.action, initialDelete);
    assert.equal(counts.form, beforeDelete.form);
    assert.equal(counts.shared, beforeDelete.shared);
    assert.equal(counts.view, beforeDelete.view);
    assert.equal(counts.modifier, beforeDelete.modifier);
    assert.ok(counts.supprimer > beforeDelete.supprimer);

    await act(async () => { deletions[0].reject(new Error('Suppression refusée')); await deletion; });
    assert.equal(pathname, '/consult/101');
    assert.equal(navigationCount, 0);
    assert.equal(deleteProps.rid, null);
    assert.equal(counts.form, beforeDelete.form);
    assert.equal(counts.shared, beforeDelete.shared);
    assert.equal(counts.view, beforeDelete.view);
    assert.equal(store.getState().mdlConsulterDepartement.etatSupprimerDepartement.erreur, true);
    idleSpinner();

    // A completed consultation followed by another ID must use the new route,
    // without refetching on unrelated renders or duplicating the shared reader.
    await act(async () => navigate('/consult/202'));
    assert.deepEqual(readings.map(r => r.id), ['101', '202']);
    await act(async () => readings[1].resolve({ id: '202', nom: 'Finance' }));
    assert.equal(document.querySelector('[data-departement]')?.textContent, 'Finance');
    assert.equal(document.querySelector('[data-shared]')?.textContent, 'Finance');
    assert.equal(sharedRead.departement, store.getState().mdlConsulterDepartement.departement);

    await act(async () => { deletion = deleteProps.action(); });
    assert.equal(deletions[1].id, '202');
    await act(async () => { deletions[1].resolve(undefined); await deletion; });
    assert.equal(pathname, '/list');
    assert.equal(navigationCount, 1);
    assert.equal(store.getState().mdlConsulterDepartement.etatSupprimerDepartement.succes, false);
    assert.equal(readings.length, 2);
    idleSpinner();
} finally {
    await act(async () => root.unmount());
    dom.window.close();
}
