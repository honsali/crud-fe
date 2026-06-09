import { FC, Key, ReactNode } from 'react';
import { ContexteMenuOngletProvider } from '../../noyau/contexte/ContexteMenuOnglet';
import { ContexteTableauProvider } from '../../noyau/contexte/ContexteTableau';
import MenuOngletInterne from './MenuOngletInterne';

export interface MenuOngletProps {
    ongletActif?: string | null;
    siOngletChange?: (key: string) => void;
    fond?: 'blanc' | 'clair' | 'fonce' | 'transparent';
    marge?: string;
    children: ReactNode;
}

const MenuOnglet: FC<MenuOngletProps> = (props) => {

    return (
        <ContexteMenuOngletProvider ongletCourantParDefaut={props.ongletActif ?? undefined}>
            <ContexteTableauProvider type="fonce">
                <MenuOngletInterne {...props} />
            </ContexteTableauProvider>
        </ContexteMenuOngletProvider >
    );
};

export default MenuOnglet;
