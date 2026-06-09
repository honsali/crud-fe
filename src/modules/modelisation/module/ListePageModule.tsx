import { faCubes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContexteViewProvider, type PageDefinition } from 'waxant';
import ViewListerModule from './lister/ViewListerModule';

export const PageListerModule: PageDefinition = {
    key: 'PageListerModule',
    path: '/modelisation/module/lister',
    toPath: (args) => '/modelisation/module/lister',
    icone: <FontAwesomeIcon icon={faCubes} />,
    menu: 'modelisation/module',
    view: (
        <ContexteViewProvider uc="UcListerModule">
            <div></div>
        </ContexteViewProvider>
    ),
};

const ListePageModule = [
    PageListerModule, //
];
export default ListePageModule;