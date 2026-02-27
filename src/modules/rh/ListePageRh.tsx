import { faPeopleLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Outlet } from 'react-router';
import { ContexteViewProvider, type PageDefinition } from 'waxant';

export const PageRh: PageDefinition = {
    key: 'PageRh',
    path: '/rh',
    toPath: (args) => '/rh',
    icone: <FontAwesomeIcon icon={faPeopleLine} />,
    menu: 'rh',
    view: (
        <ContexteViewProvider uc="UcRh">
            <Outlet />
        </ContexteViewProvider>
    ),
};

const ListePageRh = [
    PageRh,
];
export default ListePageRh;