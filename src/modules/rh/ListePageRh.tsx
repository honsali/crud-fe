import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContexteViewProvider, PageDefinition } from 'waxant';
import ViewConsulterDepartement from './departement/consulter/ViewConsulterDepartement';
import ViewCreerDepartement from './departement/creer/ViewCreerDepartement';
import ViewListerDepartement from './departement/lister/ViewListerDepartement';
import ViewModifierDepartement from './departement/modifier/ViewModifierDepartement';

export const PageConsulterDepartement: PageDefinition = {
    key: 'PageConsulterDepartement',
    path: '/rh/consulter/:idDepartement',
    toPath: (args) => `/rh/consulter/${args.idDepartement}`,
    view: (
        <ContexteViewProvider uc="UcConsulterDepartement">
            <ViewConsulterDepartement />
        </ContexteViewProvider>
    ),
};

export const PageCreerDepartement: PageDefinition = {
    key: 'PageCreerDepartement',
    path: '/rh/creer',
    toPath: (args) => '/rh/creer',
    view: (
        <ContexteViewProvider uc="UcCreerDepartement">
            <ViewCreerDepartement />
        </ContexteViewProvider>
    ),
};

export const PageListerDepartement: PageDefinition = {
    key: 'PageListerDepartement',
    path: '/rh/lister',
    toPath: (args) => '/rh/lister',
    icone: <FontAwesomeIcon icon={faMagnifyingGlass} />,
    menu: 'rh',
    view: (
        <ContexteViewProvider uc="UcListerDepartement">
            <ViewListerDepartement />
        </ContexteViewProvider>
    ),
};

export const PageModifierDepartement: PageDefinition = {
    key: 'PageModifierDepartement',
    path: '/rh/modifier/:idDepartement',
    toPath: (args) => `/rh/modifier/${args.idDepartement}`,
    view: (
        <ContexteViewProvider uc="UcModifierDepartement">
            <ViewModifierDepartement />
        </ContexteViewProvider>
    ),
};

const ListePageRh = [
    PageConsulterDepartement, //
    PageCreerDepartement,
    PageListerDepartement,
    PageModifierDepartement,
];
export default ListePageRh;