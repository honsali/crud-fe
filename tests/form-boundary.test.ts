import { beforeEach, expect, mock, test } from 'bun:test';
import { configureStore, Middleware } from '@reduxjs/toolkit';
import { FormInstance } from 'antd';
import { IResetPasswordRequest, IUpdateAccountForm } from '../src/modele/admin/account/DomaineAccount';
import { IRequeteEmploye } from '../src/modele/rh/employe/DomaineEmploye';
import action from '../src/waxant/noyau/redux/action';
import * as etats from '../src/waxant/noyau/redux/EtatMdl';
import messageReducer from '../src/waxant/noyau/message/MdlMessage';
import util from '../src/waxant/noyau/util/util';

let store: any;
let routeParams: Record<string, string | undefined> = {};
const requests: Record<string, unknown>[] = [];
const apiCalls: { operation: string; args: unknown[] }[] = [];

const recordCall = (operation: string) => async (...args: unknown[]) => {
    apiCalls.push({ operation, args });
};

mock.module('react-redux', () => ({
    useSelector: (selector) => selector(store.getState()),
}));
mock.module('react-router', () => ({ useParams: () => routeParams }));
mock.module('waxant', () => ({
    ...etats,
    action,
    util,
    useAppDispatch: () => store.dispatch,
}));
mock.module('modele/rh/departement/ServiceDepartement', () => ({
    default: { maj: recordCall('majDepartement') },
}));
mock.module('modele/rh/employe/ServiceEmploye', () => ({
    default: {
        maj: recordCall('majEmploye'),
        filtrer: async (filtre: unknown, pageCourante = 0) => {
            apiCalls.push({ operation: 'filtrerEmploye', args: [filtre, pageCourante] });
            return { liste: [], pagination: { pageCourante } };
        },
    },
}));
mock.module('modele/rh/conge/ServiceConge', () => ({
    default: { maj: recordCall('majConge') },
}));
mock.module('modele/admin/account/ServiceAccount', () => ({
    default: {
        maj: recordCall('majAccount'),
        reinitialiserMotDePasse: recordCall('reinitialiserMotDePasseAccount'),
    },
}));

// Load the real hooks, controllers and reducers after replacing only their
// React context and HTTP services. Redux and the action wrapper stay real.
const { default: useModifierDepartement } = await import('../src/modules/rh/departement/modifier/useModifierDepartement');
const { default: departementReducer } = await import('../src/modules/rh/departement/modifier/MdlModifierDepartement');
const { default: useModifierEmploye } = await import('../src/modules/rh/employe/modifier/useModifierEmploye');
const { default: employeReducer } = await import('../src/modules/rh/employe/modifier/MdlModifierEmploye');
const { default: useModifierConge } = await import('../src/modules/rh/employe/conge/modifier/useModifierConge');
const { default: congeReducer } = await import('../src/modules/rh/employe/conge/modifier/MdlModifierConge');
const { default: useFiltrerEmploye } = await import('../src/modules/rh/employe/filtrer/useFiltrerEmploye');
const { default: filtreReducer } = await import('../src/modules/rh/employe/filtrer/MdlFiltrerEmploye');
const { default: useModifierAccount } = await import('../src/modules/admin/account/modifier/useModifierAccount');
const { default: modifierAccountReducer } = await import('../src/modules/admin/account/modifier/MdlModifierAccount');
const { default: useConsulterAccount } = await import('../src/modules/admin/account/consulter/useConsulterAccount');
const { default: consulterAccountReducer } = await import('../src/modules/admin/account/consulter/MdlConsulterAccount');

const captureRequests: Middleware = () => (next) => (value) => {
    const event = value as { meta?: { requestStatus: string; arg: Record<string, unknown> } };
    if (event.meta?.requestStatus === 'pending') {
        requests.push(event.meta.arg);
    }
    return next(value);
};

beforeEach(() => {
    requests.length = 0;
    apiCalls.length = 0;
    routeParams = {};
    store = configureStore({
        reducer: {
            mdlMessage: messageReducer,
            mdlModifierDepartement: departementReducer,
            mdlModifierEmploye: employeReducer,
            mdlModifierConge: congeReducer,
            mdlFiltrerEmploye: filtreReducer,
            mdlModifierAccount: modifierAccountReducer,
            mdlConsulterAccount: consulterAccountReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(captureRequests),
    });
});

const formWith = <T extends object>(values: T) => {
    const validateFields = mock(async () => values);
    const getFieldsValue = mock(() => values);
    return {
        form: { validateFields, getFieldsValue } as unknown as FormInstance<T>,
        validateFields,
        getFieldsValue,
    };
};

const modificationCases = [
    {
        operation: 'majDepartement',
        params: { idDepartement: '101' },
        run: (form: FormInstance) => useModifierDepartement().majDepartement({ form }),
    },
    {
        operation: 'majEmploye',
        params: { idEmploye: '101' },
        run: (form: FormInstance) => useModifierEmploye().majEmploye({ form }),
    },
    {
        operation: 'majConge',
        params: { idEmploye: '202', idConge: '101' },
        run: (form: FormInstance) => useModifierConge().majConge({ form }),
    },
];

for (const scenario of modificationCases) {
    test(`${scenario.operation}: validates in the hook and dispatches only the values`, async () => {
        routeParams = scenario.params;
        const values = { id: '101', version: 4, code: 'TEST' };
        const { form, validateFields, getFieldsValue } = formWith(values);

        const result = await scenario.run(form);

        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(validateFields).toHaveBeenCalledTimes(1);
        expect(getFieldsValue).not.toHaveBeenCalled();
        expect(requests).toEqual([{ request: values, ...scenario.params }]);
        expect(JSON.parse(JSON.stringify(requests))).toEqual(requests);
        expect(apiCalls).toEqual([{ operation: scenario.operation, args: [values] }]);
    });
}

test('filtering extracts plain criteria and pagination reuses them without a form', async () => {
    const { form, validateFields, getFieldsValue } = formWith<IRequeteEmploye>({ nom: 'Dupont', prenom: '' });
    const hook = useFiltrerEmploye();

    await hook.filtrerEmploye({ form });
    await hook.changerPageFiltrerEmploye({ pageCourante: 2 });

    expect(validateFields).not.toHaveBeenCalled();
    expect(getFieldsValue).toHaveBeenCalledTimes(1);
    expect(requests).toEqual([{ filtre: { nom: 'Dupont' } }, { pageCourante: 2 }]);
    expect(apiCalls).toEqual([
        { operation: 'filtrerEmploye', args: [{ nom: 'Dupont' }, 0] },
        { operation: 'filtrerEmploye', args: [{ nom: 'Dupont' }, 2] },
    ]);
    expect(store.getState().mdlFiltrerEmploye.pageCourante).toBe(2);
});

test('account update keeps its API shape and excludes display-only fields', async () => {
    routeParams = { idAccount: '303' };
    const values = {
        role: 'ROLE_ADMIN', activated: false, version: 0,
        username: 'display-only', password: 'not-sent',
    };
    const { form, validateFields } = formWith<IUpdateAccountForm>(values);

    await useModifierAccount().majAccount({ form });

    const request = { role: { id: 'ROLE_ADMIN' }, activated: false, version: 0 };
    expect(validateFields).toHaveBeenCalledTimes(1);
    expect(requests).toEqual([{ request, idAccount: '303' }]);
    expect(apiCalls).toEqual([{ operation: 'majAccount', args: ['303', request] }]);
});

test('password reset sends only the password, never the form or displayed username', async () => {
    routeParams = { idAccount: '303' };
    const values = { password: 'test-password', username: 'display-only' };
    const { form, validateFields } = formWith<IResetPasswordRequest>(values);

    await useConsulterAccount().reinitialiserMotDePasseAccount({ form });

    const request = { password: 'test-password' };
    expect(validateFields).toHaveBeenCalledTimes(1);
    expect(requests).toEqual([{ request, idAccount: '303' }]);
    expect(apiCalls).toEqual([{ operation: 'reinitialiserMotDePasseAccount', args: ['303', request] }]);
});

const commandCases = [
    ...modificationCases,
    {
        operation: 'majAccount',
        params: { idAccount: '303' },
        run: (form: FormInstance) => useModifierAccount().majAccount({ form }),
    },
    {
        operation: 'reinitialiserMotDePasseAccount',
        params: { idAccount: '303' },
        run: (form: FormInstance) => useConsulterAccount().reinitialiserMotDePasseAccount({ form }),
    },
];

for (const scenario of commandCases) {
    test(`${scenario.operation}: an invalid form never reaches Redux or the service`, async () => {
        routeParams = scenario.params;
        const validationError = { errorFields: [{ name: ['code'], errors: ['Required'] }] };
        const form = {
            validateFields: async () => { throw validationError; },
        } as unknown as FormInstance;

        await expect(scenario.run(form)).rejects.toEqual(validationError);

        expect(requests).toEqual([]);
        expect(apiCalls).toEqual([]);
        expect(store.getState().mdlMessage.actionEnCours).toEqual({});
    });
}
