import { TeamOutlined } from '@ant-design/icons';
import { Navigate } from 'react-router-dom';
import { ContexteViewProvider, type PageDefinition } from 'waxant';
import ViewAccounts from './ViewAccounts';

export const PageAccueilAdmin: PageDefinition = {
    key: 'PageAccueilAdmin',
    path: '/',
    toPath: () => '/',
    view: <Navigate to="/admin/accounts" replace />,
};

export const PageAccounts: PageDefinition = {
    key: 'PageAccounts',
    path: '/admin/accounts',
    toPath: () => '/admin/accounts',
    menu: 'accounts',
    icone: <TeamOutlined />,
    view: (
        <ContexteViewProvider uc="UcAccounts">
            <ViewAccounts />
        </ContexteViewProvider>
    ),
};

const ListePageAccount = [PageAccueilAdmin, PageAccounts];

export default ListePageAccount;
