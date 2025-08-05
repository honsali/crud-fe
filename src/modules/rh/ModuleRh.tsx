import { ModuleDefinition } from 'waxant';
import { I18nRh } from './I18nRh';
import ListePageRh, { PageListerDepartement } from './ListePageRh';
import ReducerRh from './ReducerRh';

const ModuleRh = (): ModuleDefinition => {
    return {
        key: 'ModuleRh',
        mapI18n: I18nRh,
        listePage: ListePageRh,
        reducer: ReducerRh,
        index: PageListerDepartement,
    };
};
export default ModuleRh;