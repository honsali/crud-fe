import { createContext, useContext, useState, type ReactNode } from 'react';

interface ContextListerMenuType {
    menuCourant: string | null;
    setMenuCourant: (type: string | null) => void;
}

const ContextListerMenu = createContext<ContextListerMenuType>({
    menuCourant: null,
    setMenuCourant: () => { },
});

export const useContextListerMenu = () => useContext(ContextListerMenu);

export const ListerMenuProvider = ({ children }: { children: ReactNode }) => {
    const [menuCourant, setMenuCourant] = useState<string | null>(null);

    return (
        <ContextListerMenu.Provider value={{ menuCourant, setMenuCourant }}>
            {children}
        </ContextListerMenu.Provider>
    );
};
