import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

export interface ILayoutContextProps {
    menuOuvert: boolean;
    gedOuvert: boolean;
    gedFixe: boolean;
    setMenuOuvert: (ouvert: boolean) => void;
    setGedOuvert: (ouvert: boolean) => void;
    setGedFixe: (fixe: boolean) => void;
}

const LayoutContext = createContext<ILayoutContextProps | undefined>(undefined);

interface LayoutContextProviderProps {
    children: ReactNode;
}

export const LayoutContextProvider: React.FC<LayoutContextProviderProps> = ({ children }) => {
    const [menuOuvert, setMenuOuvert] = useState<boolean>(() => {
        const saved = localStorage.getItem('menuOuvert');
        return saved !== null ? JSON.parse(saved) : true;
    });
    const [gedOuvert, setGedOuvert] = useState<boolean>(() => {
        const saved = localStorage.getItem('gedOuvert');
        return saved !== null ? JSON.parse(saved) : false;
    });
    const [gedFixe, setGedFixe] = useState<boolean>(() => {
        const saved = localStorage.getItem('gedFixe');
        return saved !== null ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        localStorage.setItem('menuOuvert', JSON.stringify(menuOuvert));
    }, [menuOuvert]);

    useEffect(() => {
        localStorage.setItem('gedOuvert', JSON.stringify(gedOuvert));
    }, [gedOuvert]);

    useEffect(() => {
        localStorage.setItem('gedFixe', JSON.stringify(gedFixe));
    }, [gedFixe]);

    useEffect(() => {
        localStorage.setItem('gedOuvert', JSON.stringify(true));
    }, []);

    return (
        <LayoutContext.Provider
            value={{
                menuOuvert,
                gedOuvert,
                gedFixe,
                setMenuOuvert,
                setGedOuvert,
                setGedFixe,
            }}
        >
            {children}
        </LayoutContext.Provider>
    );
};

const useLayoutContext = () => {
    const context = useContext(LayoutContext);
    if (context === undefined) {
        throw new Error('useLayoutContext must be used within a LayoutContextProvider');
    }
    return context;
};

export default useLayoutContext;
