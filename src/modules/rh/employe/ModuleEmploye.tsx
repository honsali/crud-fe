import { ModuleDefinition } from 'waxant';
import { I18nEmploye } from './I18nEmploye';
import ListePageEmploye, { PageFiltrerEmploye } from './ListePageEmploye';
import ReducerEmploye from './ReducerEmploye';

const ModuleEmploye = (): ModuleDefinition => {
    return {
        key: 'ModuleEmploye',
        mapI18n: I18nEmploye,
        listePage: ListePageEmploye,
        reducer: ReducerEmploye,
        index: PageFiltrerEmploye,
    };
};
export default ModuleEmploye;