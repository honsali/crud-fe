import { createContext, useContext, useState, type ReactNode } from 'react';

export interface IContexteMenuOngletProps {
    ongletCourant?: string;
    setOngletCourant?: (onglet: string) => void;
}

const ContexteMenuOnglet = createContext({} as IContexteMenuOngletProps);

interface ContexteMenuOngletProviderProps {
    ongletCourantParDefaut?: string;
    children: ReactNode;
}

export const ContexteMenuOngletProvider: React.FC<ContexteMenuOngletProviderProps> = ({ ongletCourantParDefaut, children }) => {
    const [ongletCourant, setOngletCourant] = useState(ongletCourantParDefaut);
    return <ContexteMenuOnglet.Provider value={{ ongletCourant, setOngletCourant }}>{children}</ContexteMenuOnglet.Provider>;
};

const useContexteMenuOnglet = () => {
    const context = useContext(ContexteMenuOnglet);
    if (context === undefined) {
        throw new Error('useContexteMenuOnglet must be used within a ContexteMenuOngletProvider');
    }
    return context;
};

export default useContexteMenuOnglet;
