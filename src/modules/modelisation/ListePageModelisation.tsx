import { faPencilRuler } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Outlet } from 'react-router';
import { ContexteViewProvider, type PageDefinition } from 'waxant';

export const PageModelisation: PageDefinition = {
    key: 'PageModelisation',
    path: '/modelisation',
    toPath: (args) => '/modelisation',
    icone: <FontAwesomeIcon icon={faPencilRuler} />,
    menu: 'modelisation',
    view: (
        <ContexteViewProvider uc="UcModelisation">
            <Outlet />
        </ContexteViewProvider>
    ),
};

const ListePageModelisation = [
    PageModelisation,
];
export default ListePageModelisation;