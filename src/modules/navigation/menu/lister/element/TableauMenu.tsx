import { ConfigProvider, Menu } from 'antd';
import type { IMenu } from 'modele/navigation/menu/DomaineMenu';
import { useCallback, useEffect, useState } from 'react';
import { FaIcone } from 'waxant';
import { ListerMenuProvider, useContextListerMenu } from '../ContextListerMenu';
import useListerMenu from '../useListerMenu';
import ActionMenu from './ActionMenu';
import BlocMenu from './BlocMenu';
import DialogueModifierMenu from './DialogueModifierMenu';

export type DataNode = {
    key: string;
    label?: React.ReactNode;
    icon?: React.ReactNode;
    parentId?: string;
    children?: DataNode[];
};


const TableauMenu = () => {
    const { listeMenu, listerMenu } = useListerMenu();
    const [dialogueMenu, setDialogueMenu] = useState<IMenu | null>(null);
    const [dialogueVisible, setDialogueVisible] = useState(false);

    const buildTree = (menus: IMenu[]) => {
        const menuMap = new Map<string, DataNode>();
        const roots: DataNode[] = [];

        for (const m of menus) {
            menuMap.set(m.id, { key: '' + m.id, label: <Label menu={m} />, icon: buildIcon(m), parentId: m.menu?.id, children: [] });
        }
        const keys: string[] = [];
        for (const m of menus) {
            const node = menuMap.get(m.id);
            keys.push(node.key);
            if (node.parentId) {
                menuMap.get(node.parentId).children.push(node);
            } else {
                roots.push(node);
            }
        }
        return { items: roots, opened: keys };
    };

    const Label = ({ menu }) => {
        const { menuCourant, setMenuCourant } = useContextListerMenu();
        return (
            <span title="" onMouseEnter={() => setMenuCourant(menu.id)} onMouseLeave={() => setMenuCourant(null)}>
                <span>{menuCourant === menu.id ? menu.label.substring(0, 5) : menu.label}</span>
                {menuCourant === menu.id && <ActionMenu menu={menu} onEdit={() => { setDialogueMenu(menu); setDialogueVisible(true); }} />}
            </span>
        )
    };

    const buildIcon = (menu: IMenu) => {
        if (menu.icon) {
            return <FaIcone nomIcone={menu.icon} />;
        }
    }

    useEffect(() => {
        listerMenu();
    }, []);


    const getMenu = useCallback(() => {
        const { items, opened } = buildTree(listeMenu);
        if (listeMenu?.length > 0) {
            return (
                <Menu
                    inlineIndent={8}
                    mode="inline"
                    theme="dark"
                    items={items}
                    defaultOpenKeys={opened}
                />
            );
        }
    }, [listeMenu]);

    return (
        <ListerMenuProvider>
            <ConfigProvider theme={{ token: { motion: false } }}>
                <BlocMenu>{getMenu()}</BlocMenu>
            </ConfigProvider>
            <DialogueModifierMenu menu={dialogueMenu} visible={dialogueVisible} setVisible={setDialogueVisible} />
        </ListerMenuProvider>
    );
};

export default TableauMenu;
