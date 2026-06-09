import { createContext, useContext, useState, type ReactNode } from 'react';

interface ContextConsulterMenuType {
    carteCourante: string | null;
    setCarteCourante: (type: string | null) => void;
}

const ContextConsulterMenu = createContext<ContextConsulterMenuType>({
    carteCourante: null,
    setCarteCourante: () => { },
});

export const useContextConsulterMenu = () => useContext(ContextConsulterMenu);

export const ConsulterMenuProvider = ({ children }: { children: ReactNode }) => {
    const [carteCourante, setCarteCourante] = useState<string | null>(null);

    return (
        <ContextConsulterMenu.Provider value={{ carteCourante, setCarteCourante }}>
            {children}
        </ContextConsulterMenu.Provider>
    );
};
