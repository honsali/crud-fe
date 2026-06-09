import { ContexteViewProvider, type PageDefinition } from 'waxant';

export const PageListerMenu: PageDefinition = {
    key: 'PageListerMenu',
    path: '/navigation/lister',
    toPath: (args) => '/navigation/lister',
    view: (
        <ContexteViewProvider uc="UcListerMenu">
            <div></div>
        </ContexteViewProvider>
    ),
};

const ListePageNavigation = [
    PageListerMenu, //
];
export default ListePageNavigation;