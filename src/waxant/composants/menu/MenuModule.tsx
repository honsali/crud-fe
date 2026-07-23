import { Menu, type MenuProps } from 'antd';
import { useCallback } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import useContexteAuth from '../../noyau/auth/ContexteAuth';
import useContexteApp from '../../noyau/contexte/ContexteApp';
import useI18n from '../../noyau/i18n/useI18n';
import type { ModuleDefinition } from '../../noyau/routes/ModuleDefinition';
import type { PageDefinition } from '../../noyau/routes/PageDefinition';

interface MenuModuleProps {
    ouvert: boolean;
}

type MenuItem = NonNullable<MenuProps['items']>[number];
type MenuPage = PageDefinition & { menu: string };

const getFirstNSegments = (value: string, numberOfSegments: number) => value
    .split('/')
    .slice(0, numberOfSegments + 1)
    .join('/');

const hasMenu = (page?: PageDefinition): page is MenuPage => Boolean(page?.menu);

const MenuModule = ({ ouvert }: MenuModuleProps) => {
    const { i18n } = useI18n();
    const { mapDomaine } = useContexteApp();
    const { role } = useContexteAuth();
    const params = useParams();
    const location = useLocation();

    const listeElementMenu = useCallback(
        (listeModule: ModuleDefinition[]): { items: MenuItem[]; selected: string[]; opened: string[] } => {
            const selected: string[] = [];
            const opened: string[] = [];

            const pageToElementMenu = (page: MenuPage, children?: MenuItem[]): MenuItem => {
                const path = page.toPath(params);
                const disabled = path.includes('undefined');

                if (location.pathname.startsWith(path)) {
                    opened.push(page.menu);
                }
                if (getFirstNSegments(location.pathname, 3) === getFirstNSegments(path, 3)) {
                    selected.push(page.menu);
                }

                return {
                    key: page.menu,
                    label: <Link to={disabled ? '#' : path}>{i18n(page.key)}</Link>,
                    icon: page.icone,
                    disabled,
                    ...(children?.length ? { children } : {}),
                } as MenuItem;
            };

            const items = listeModule.reduce<MenuItem[]>((result, module) => {
                if (!hasMenu(module.index)) {
                    return result;
                }

                const children = (module.listeSousModule ?? [])
                    .filter((submodule) => hasMenu(submodule.index))
                    .map((submodule) => pageToElementMenu(submodule.index as MenuPage));
                result.push(pageToElementMenu(module.index, children));
                return result;
            }, []);

            return { items, selected, opened };
        },
        [i18n, location.pathname, params],
    );

    const domainModules = role ? mapDomaine[role]?.listeModule ?? [] : [];
    const { items, selected, opened } = listeElementMenu(domainModules);

    return (
        <Menu
            items={items}
            mode="inline"
            theme="dark"
            defaultOpenKeys={opened}
            openKeys={ouvert ? opened : undefined}
            selectedKeys={selected}
            inlineCollapsed={false}
        />
    );
};

export default MenuModule;
