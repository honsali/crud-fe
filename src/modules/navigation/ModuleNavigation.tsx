import { type ModuleDefinition } from 'waxant';
import { I18nNavigation } from './I18nNavigation';
import ListePageNavigation, { PageListerMenu } from './ListePageNavigation';
import ReducerNavigation from './ReducerNavigation';

const ModuleNavigation = (): ModuleDefinition => {
    return {
        key: 'ModuleNavigation',
        mapI18n: I18nNavigation,
        listePage: ListePageNavigation,
        reducer: ReducerNavigation,
        index: PageListerMenu,
    };
};
export default ModuleNavigation;