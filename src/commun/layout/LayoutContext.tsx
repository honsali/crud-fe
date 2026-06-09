import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export interface ILayoutContextProps {
    menuOuvert: boolean;
    entiteOuvert: boolean;
    moduleOuvert: boolean;
    setMenuOuvert: (ouvert: boolean) => void;
    setEntiteOuvert: (ouvert: boolean) => void;
    setModuleOuvert: (ouvert: boolean) => void;
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
    const [entiteOuvert, setEntiteOuvert] = useState<boolean>(() => {
        const saved = localStorage.getItem('entiteOuvert');
        return saved !== null ? JSON.parse(saved) : false;
    });
    const [moduleOuvert, setModuleOuvert] = useState<boolean>(() => {
        const saved = localStorage.getItem('moduleOuvert');
        return saved !== null ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        localStorage.setItem('menuOuvert', JSON.stringify(menuOuvert));
    }, [menuOuvert]);

    useEffect(() => {
        localStorage.setItem('entiteOuvert', JSON.stringify(entiteOuvert));
    }, [entiteOuvert]);

    useEffect(() => {
        localStorage.setItem('moduleOuvert', JSON.stringify(moduleOuvert));
    }, [moduleOuvert]);

    return (
        <LayoutContext.Provider
            value={{
                menuOuvert,
                entiteOuvert,
                moduleOuvert,
                setMenuOuvert,
                setEntiteOuvert,
                setModuleOuvert,
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
