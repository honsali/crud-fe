import { Menu, MenuProps } from 'antd';
import { useCallback } from 'react';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { PageDefinition, useContexteApp, useContexteAuth, useI18n } from 'waxant';
import { ModuleDefinition } from 'waxant/noyau/routes/ModuleDefinition';

interface MenuModuleProps {
    ouvert: boolean;
}

type MenuItem = Required<MenuProps>['items'][number];

const getFirstNSegments = (str: string, n: number) => {
    return str
        .split('/')
        .slice(0, n + 1)
        .join('/');
};

const MenuModule: React.FC<MenuModuleProps> = ({ ouvert }) => {
    const { i18n } = useI18n();
    const { mapDomaine } = useContexteApp();
    const { role } = useContexteAuth();
    const params = useParams();
    const location = useLocation();

    const listeElementMenu = useCallback(
        (listeModule: ModuleDefinition[]): { items: MenuItem[]; selected: string[]; opened: string[] } => {
            const selected: string[] = [];
            const opened: string[] = [];

            const pageToElementMenu = (page: PageDefinition, children?: MenuItem[]) => {
                const path = page.toPath(params);
                const disabled = path.indexOf('undefined') > -1;

                if (location.pathname.startsWith(path)) {
                    opened.push(page.menu);
                }
                const locationSegments = getFirstNSegments(location.pathname, 3);
                const pathSegments = getFirstNSegments(path, 3);

                if (locationSegments === pathSegments) {
                    selected.push(page.menu);
                }

                return {
                    key: page.menu,
                    label: <Link to={disabled ? '#' : path}>{i18n(page.key)}</Link>,
                    icon: page.icone,
                    disabled,
                    children,
                };
            };

            const items = listeModule?.reduce<MenuItem[]>((acc, module) => {
                if (module.index.menu) {
                    let item;
                    const path = module.index.toPath(params);
                    const disabled = path.indexOf('undefined') > -1;
                    if (disabled) {
                        item = {
                            key: module.index.menu,
                            label: <Link to="#">{i18n(module.index.key)}</Link>,
                            icon: module.index.icone,
                            disabled,
                        };
                    } else if (module.listeSousModule?.length) {
                        const children = module.listeSousModule.reduce<MenuItem[]>((acc, sousModule) => {
                            if (sousModule.index.menu) {
                                acc.push(pageToElementMenu(sousModule.index));
                            }
                            return acc;
                        }, []);

                        item = pageToElementMenu(module.index, children);
                    } else {
                        item = pageToElementMenu(module.index);
                    }
                    if (item) acc.push(item);
                }
                return acc;
            }, []);

            return { items: items || [], selected, opened };
        },
        [i18n, params, location.pathname]
    );

    const getMenu = useCallback(() => {
        const { items, selected, opened } = listeElementMenu(mapDomaine[role]?.listeModule || []);
        if (ouvert) {
            return <Menu items={items} mode="inline" theme="dark" defaultOpenKeys={opened} openKeys={opened} selectedKeys={selected} />;
        } else {
            return <Menu items={items} mode="inline" theme="dark" defaultOpenKeys={opened} selectedKeys={selected} inlineCollapsed={false} />;
        }
    }, [role, location.pathname, ouvert, mapDomaine, params, listeElementMenu]);

    return getMenu();
};

export default MenuModule;
