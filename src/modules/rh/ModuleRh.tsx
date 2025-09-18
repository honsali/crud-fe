import { ModuleDefinition } from 'waxant';
import { I18nRh } from './I18nRh';
import ListePageRh, { PageRh } from './ListePageRh';
import ReducerRh from './ReducerRh';

const ModuleRh = (listeSousModule: ModuleDefinition[]): ModuleDefinition => {
    return {
        key: 'ModuleRh',
        mapI18n: I18nRh,
        listePage: ListePageRh,
        listeSousModule,
        reducer: ReducerRh,
        index: PageRh,
    };
};
export default ModuleRh;