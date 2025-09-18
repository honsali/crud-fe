import { faSitemap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContexteViewProvider, PageDefinition } from 'waxant';
import ViewConsulterDepartement from './consulter/ViewConsulterDepartement';
import ViewCreerDepartement from './creer/ViewCreerDepartement';
import ViewListerDepartement from './lister/ViewListerDepartement';
import ViewModifierDepartement from './modifier/ViewModifierDepartement';

export const PageConsulterDepartement: PageDefinition = {
    key: 'PageConsulterDepartement',
    path: '/rh/departement/consulter/:idDepartement',
    toPath: (args) => `/rh/departement/consulter/${args.idDepartement}`,
    view: (
        <ContexteViewProvider uc="UcConsulterDepartement">
            <ViewConsulterDepartement />
        </ContexteViewProvider>
    ),
};

export const PageCreerDepartement: PageDefinition = {
    key: 'PageCreerDepartement',
    path: '/rh/departement/creer',
    toPath: (args) => '/rh/departement/creer',
    view: (
        <ContexteViewProvider uc="UcCreerDepartement">
            <ViewCreerDepartement />
        </ContexteViewProvider>
    ),
};

export const PageListerDepartement: PageDefinition = {
    key: 'PageListerDepartement',
    path: '/rh/departement/lister',
    toPath: (args) => '/rh/departement/lister',
    icone: <FontAwesomeIcon icon={faSitemap} />,
    menu: 'rh/departement',
    view: (
        <ContexteViewProvider uc="UcListerDepartement">
            <ViewListerDepartement />
        </ContexteViewProvider>
    ),
};

export const PageModifierDepartement: PageDefinition = {
    key: 'PageModifierDepartement',
    path: '/rh/departement/modifier/:idDepartement',
    toPath: (args) => `/rh/departement/modifier/${args.idDepartement}`,
    view: (
        <ContexteViewProvider uc="UcModifierDepartement">
            <ViewModifierDepartement />
        </ContexteViewProvider>
    ),
};

const ListePageDepartement = [
    PageConsulterDepartement, //
    PageCreerDepartement,
    PageListerDepartement,
    PageModifierDepartement,
];
export default ListePageDepartement;