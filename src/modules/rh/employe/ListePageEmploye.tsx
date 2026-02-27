import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContexteViewProvider, type PageDefinition } from 'waxant';
import ViewConsulterConge from './conge/consulter/ViewConsulterConge';
import ViewCreerConge from './conge/creer/ViewCreerConge';
import ViewModifierConge from './conge/modifier/ViewModifierConge';
import ViewConsulterEmploye from './consulter/ViewConsulterEmploye';
import ViewCreerEmploye from './creer/ViewCreerEmploye';
import ViewFiltrerEmploye from './filtrer/ViewFiltrerEmploye';
import ViewModifierEmploye from './modifier/ViewModifierEmploye';

export const PageConsulterConge: PageDefinition = {
    key: 'PageConsulterConge',
    path: '/rh/employe/:idEmploye/consulter/:idConge',
    toPath: (args) => `/rh/employe/${args.idEmploye}/consulter/${args.idConge}`,
    view: (
        <ContexteViewProvider uc="UcConsulterConge">
            <ViewConsulterConge />
        </ContexteViewProvider>
    ),
};

export const PageConsulterEmploye: PageDefinition = {
    key: 'PageConsulterEmploye',
    path: '/rh/employe/consulter/:idEmploye',
    toPath: (args) => `/rh/employe/consulter/${args.idEmploye}`,
    view: (
        <ContexteViewProvider uc="UcConsulterEmploye">
            <ViewConsulterEmploye />
        </ContexteViewProvider>
    ),
};

export const PageCreerConge: PageDefinition = {
    key: 'PageCreerConge',
    path: '/rh/employe/:idEmploye/conge/creer',
    toPath: (args) => `/rh/employe/${args.idEmploye}/conge/creer`,
    view: (
        <ContexteViewProvider uc="UcCreerConge">
            <ViewCreerConge />
        </ContexteViewProvider>
    ),
};

export const PageCreerEmploye: PageDefinition = {
    key: 'PageCreerEmploye',
    path: '/rh/employe/creer',
    toPath: (args) => '/rh/employe/creer',
    view: (
        <ContexteViewProvider uc="UcCreerEmploye">
            <ViewCreerEmploye />
        </ContexteViewProvider>
    ),
};

export const PageFiltrerEmploye: PageDefinition = {
    key: 'PageFiltrerEmploye',
    path: '/rh/employe/filtrer',
    toPath: (args) => '/rh/employe/filtrer',
    icone: <FontAwesomeIcon icon={faUser} />,
    menu: 'rh/employe',
    view: (
        <ContexteViewProvider uc="UcFiltrerEmploye">
            <ViewFiltrerEmploye />
        </ContexteViewProvider>
    ),
};

export const PageModifierConge: PageDefinition = {
    key: 'PageModifierConge',
    path: '/rh/employe/:idEmploye/conge/modifier/:idConge',
    toPath: (args) => `/rh/employe/${args.idEmploye}/conge/modifier/${args.idConge}`,
    view: (
        <ContexteViewProvider uc="UcModifierConge">
            <ViewModifierConge />
        </ContexteViewProvider>
    ),
};

export const PageModifierEmploye: PageDefinition = {
    key: 'PageModifierEmploye',
    path: '/rh/employe/modifier/:idEmploye',
    toPath: (args) => `/rh/employe/modifier/${args.idEmploye}`,
    view: (
        <ContexteViewProvider uc="UcModifierEmploye">
            <ViewModifierEmploye />
        </ContexteViewProvider>
    ),
};

const ListePageEmploye = [
    PageConsulterConge, //
    PageConsulterEmploye,
    PageCreerConge,
    PageCreerEmploye,
    PageFiltrerEmploye,
    PageModifierConge,
    PageModifierEmploye,
];
export default ListePageEmploye;