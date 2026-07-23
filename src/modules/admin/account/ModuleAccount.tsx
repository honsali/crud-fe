import type { ModuleDefinition } from 'waxant';
import ListePageAccount, { PageAccounts } from './ListePageAccount';

const ModuleAccount = (): ModuleDefinition => ({
    key: 'ModuleAccount',
    mapI18n: {
        PageAccueilAdmin: 'Administration',
        PageAccounts: 'Comptes',
        'UcAccounts.titre': 'Comptes',
    },
    listePage: ListePageAccount,
    reducer: {},
    index: PageAccounts,
});

export default ModuleAccount;
