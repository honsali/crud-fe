import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContexteViewProvider, type PageDefinition } from 'waxant';
import ViewConsulterPage from './consulter/ViewConsulterPage';
import ViewCreerPage from './creer/ViewCreerPage';
import ViewListerPage from './lister/ViewListerPage';
import ViewModifierPage from './modifier/ViewModifierPage';

export const PageConsulterPage: PageDefinition = {
    key: 'PageConsulterPage',
    path: '/navigation/page/consulter/:idPage',
    toPath: (args) => `/navigation/page/consulter/${args.idPage}`,
    view: (
        <ContexteViewProvider uc="UcConsulterPage">
            <ViewConsulterPage />
        </ContexteViewProvider>
    ),
};

export const PageCreerPage: PageDefinition = {
    key: 'PageCreerPage',
    path: '/navigation/page/creer/:idPage',
    toPath: (args) => `/navigation/page/creer/${args.idPage}`,
    view: (
        <ContexteViewProvider uc="UcCreerPage">
            <ViewCreerPage />
        </ContexteViewProvider>
    ),
};

export const PageListerPage: PageDefinition = {
    key: 'PageListerPage',
    path: '/navigation/page/lister',
    toPath: (args) => '/navigation/page/lister',
    icone: <FontAwesomeIcon icon={faPuzzlePiece} />,
    menu: 'navigation/page',
    view: (
        <ContexteViewProvider uc="UcListerPage">
            <ViewListerPage />
        </ContexteViewProvider>
    ),
};

export const PageModifierPage: PageDefinition = {
    key: 'PageModifierPage',
    path: '/navigation/page/modifier/:idPage',
    toPath: (args) => `/navigation/page/modifier/${args.idPage}`,
    view: (
        <ContexteViewProvider uc="UcModifierPage">
            <ViewModifierPage />
        </ContexteViewProvider>
    ),
};

const ListePagePage = [
    PageConsulterPage, //
    PageCreerPage,
    PageListerPage,
    PageModifierPage,
];
export default ListePagePage;