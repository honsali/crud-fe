import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navigate } from 'react-router-dom';
import { ContexteViewProvider, PageDefinition } from 'waxant';
import ViewConsulterAccount from './consulter/ViewConsulterAccount';
import ViewCreerAccount from './creer/ViewCreerAccount';
import ViewListerAccount from './lister/ViewListerAccount';
import ViewModifierAccount from './modifier/ViewModifierAccount';

export const PageAccueilAdmin: PageDefinition = {
    key: 'PageAccueilAdmin',
    path: '/',
    toPath: () => '/',
    view: <Navigate to="/admin/account/lister" replace />,
};

export const PageConsulterAccount: PageDefinition = {
    key: 'PageConsulterAccount',
    path: '/admin/account/consulter/:idAccount',
    toPath: (args) => `/admin/account/consulter/${args.idAccount}`,
    view: (
        <ContexteViewProvider uc="UcConsulterAccount">
            <ViewConsulterAccount />
        </ContexteViewProvider>
    ),
};

export const PageCreerAccount: PageDefinition = {
    key: 'PageCreerAccount',
    path: '/admin/account/creer',
    toPath: () => '/admin/account/creer',
    view: (
        <ContexteViewProvider uc="UcCreerAccount">
            <ViewCreerAccount />
        </ContexteViewProvider>
    ),
};

export const PageListerAccount: PageDefinition = {
    key: 'PageListerAccount',
    path: '/admin/account/lister',
    toPath: () => '/admin/account/lister',
    icone: <FontAwesomeIcon icon={faUsers} />,
    menu: 'admin/account',
    view: (
        <ContexteViewProvider uc="UcListerAccount">
            <ViewListerAccount />
        </ContexteViewProvider>
    ),
};

export const PageModifierAccount: PageDefinition = {
    key: 'PageModifierAccount',
    path: '/admin/account/modifier/:idAccount',
    toPath: (args) => `/admin/account/modifier/${args.idAccount}`,
    view: (
        <ContexteViewProvider uc="UcModifierAccount">
            <ViewModifierAccount />
        </ContexteViewProvider>
    ),
};

const ListePageAccount = [
    PageAccueilAdmin,
    PageConsulterAccount,
    PageCreerAccount,
    PageListerAccount,
    PageModifierAccount,
];
export default ListePageAccount;
