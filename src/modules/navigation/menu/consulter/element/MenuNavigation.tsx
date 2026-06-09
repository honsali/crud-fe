
import { ConfigProvider, Menu, type MenuProps } from 'antd';
import type { MenuItemType } from 'antd/es/menu/interface';
import { PageConsulterPage } from 'modules/navigation/page/ListePagePage';
import { useEffect, useState } from 'react';
import { useGoToPage } from 'waxant';
import '../StyleConsulterMenu.css';
import useConsulterMenu from '../useConsulterMenu';

const MenuNavigation = () => {
    const { listePage, listerPage } = useConsulterMenu();
    const [items, setItems] = useState<MenuItem[]>([]);
    const goToPage = useGoToPage();
    const semanticClassNames: MenuProps['classNames'] = {
        itemContent: 'navigation-item-content',
    };

    type MenuItem = Required<MenuProps>['items'][number];

    useEffect(() => {
        listerPage();
    }, []);


    useEffect(() => {
        if (listePage && listePage.length > 0) {
            const list: MenuItem[] = listePage.map((m, i) => {
                return {
                    key: m.id,
                    label: m.name,
                } as MenuItemType;
            });
            setItems(list);
        }

    }, [listePage]);


    const consulterPage = ({ key }) => {
        goToPage(PageConsulterPage, { ipage: key });
    }

    return (
        <ConfigProvider theme={{ token: { motion: false } }}>
            <Menu items={items} mode="inline" theme="dark" classNames={semanticClassNames} onClick={consulterPage} />
        </ConfigProvider>
    );
};

export default MenuNavigation;
