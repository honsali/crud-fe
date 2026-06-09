import { type ModuleDefinition } from 'waxant';
import { I18nPage } from './I18nPage';
import ListePagePage, { PageListerPage } from './ListePagePage';
import ReducerPage from './ReducerPage';

const ModulePage = (): ModuleDefinition => {
    return {
        key: 'ModulePage',
        mapI18n: I18nPage,
        listePage: ListePagePage,
        reducer: ReducerPage,
        index: PageListerPage,
    };
};
export default ModulePage;