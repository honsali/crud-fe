import { FC, Key, ReactNode } from 'react';
import { ContexteMenuOngletProvider } from 'waxant/noyau/contexte/ContexteMenuOnglet';
import { ContexteTableauProvider } from 'waxant/noyau/contexte/ContexteTabeau';
import MenuOngletInterne from './MenuOngletInterne';

export interface MenuOngletProps {
    ongletActif?: string | null;
    siOngletChange?: (key: string) => void;
    fond?: 'blanc' | 'clair' | 'fonce' | 'transparent';
    marge?: string;
    children: ReactNode;
}

export interface OngletProps {
    key: Key;
    entete?: ReactNode;
    badge?: ReactNode;
    children: ReactNode;
    disabled?: boolean;
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
