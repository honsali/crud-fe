import { type ModuleDefinition } from 'waxant';
import { I18nModelisation } from './I18nModelisation';
import ListePageModelisation, { PageModelisation } from './ListePageModelisation';
import ReducerModelisation from './ReducerModelisation';

const ModuleModelisation = (listeSousModule: ModuleDefinition[]): ModuleDefinition => {
    return {
        key: 'ModuleModelisation',
        mapI18n: I18nModelisation,
        listePage: ListePageModelisation,
        listeSousModule,
        reducer: ReducerModelisation,
        index: PageModelisation,
    };
};
export default ModuleModelisation;