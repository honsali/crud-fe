import { ModuleDefinition } from 'waxant';
import { I18nAccount } from './I18nAccount';
import ListePageAccount, { PageListerAccount } from './ListePageAccount';
import ReducerAccount from './ReducerAccount';

const ModuleAccount = (): ModuleDefinition => {
    return {
        key: 'ModuleAccount',
        mapI18n: I18nAccount,
        listePage: ListePageAccount,
        reducer: ReducerAccount,
        index: PageListerAccount,
    };
};
export default ModuleAccount;
