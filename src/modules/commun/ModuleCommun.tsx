import { type ModuleDefinition } from 'waxant';
import { I18nCommun } from './I18nCommun';
import ListePageCommun, { PageCommun } from './ListePageCommun';
import ReducerCommun from './ReducerCommun';

const ModuleCommun = (): ModuleDefinition => {
    return {
        key: 'ModuleCommun',
        mapI18n: I18nCommun,
        listePage: ListePageCommun,
        reducer: ReducerCommun,
        index: PageCommun,
    };
};
export default ModuleCommun;
