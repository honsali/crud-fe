import { ModuleDefinition } from 'waxant';
import { I18nDepartement } from './I18nDepartement';
import ListePageDepartement, { PageListerDepartement } from './ListePageDepartement';
import ReducerDepartement from './ReducerDepartement';

const ModuleDepartement = (): ModuleDefinition => {
    return {
        key: 'ModuleDepartement',
        mapI18n: I18nDepartement,
        listePage: ListePageDepartement,
        reducer: ReducerDepartement,
        index: PageListerDepartement,
    };
};
export default ModuleDepartement;