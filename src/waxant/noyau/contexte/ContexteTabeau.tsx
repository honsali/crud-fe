import { ReactNode, createContext, useContext } from 'react';

export interface IContexteTableauProps {
    type?: string;
}

const ContexteTableau = createContext({} as IContexteTableauProps);

interface ContexteTableauProviderProps {
    type?: string;
    children: ReactNode;
}

export const ContexteTableauProvider: React.FC<ContexteTableauProviderProps> = ({ type, children }) => {
    return <ContexteTableau.Provider value={{ type }}>{children}</ContexteTableau.Provider>;
};

const useContexteTableau = () => {
    const context = useContext(ContexteTableau);
    if (context === undefined) {
        throw new Error('useContexteTableau must be used within a ContexteTableauProvider');
    }
    return context;
};

export default useContexteTableau;
