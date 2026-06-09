import { type ModuleDefinition } from 'waxant';
import { I18nModule } from './I18nModule';
import ListePageModule, { PageListerModule } from './ListePageModule';
import ReducerModule from './ReducerModule';

const ModuleModule = (): ModuleDefinition => {
    return {
        key: 'ModuleModule',
        mapI18n: I18nModule,
        listePage: ListePageModule,
        reducer: ReducerModule,
        index: PageListerModule,
    };
};
export default ModuleModule;