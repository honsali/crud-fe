import { ReactNode, createContext, useContext } from 'react';

export interface IContexteBoutonProps {
    type?: string;
    couleur?: 'fort' | 'normal' | 'danger';
    taille?: 'mini' | 'moyen' | 'large';
}

const ContexteBouton = createContext({} as IContexteBoutonProps);

interface ContexteBoutonProviderProps {
    type?: string;
    couleur?: 'fort' | 'normal' | 'danger';
    taille?: 'mini' | 'moyen' | 'large';
    children: ReactNode;
}

export const ContexteBoutonProvider: React.FC<ContexteBoutonProviderProps> = ({ type, couleur, taille, children }) => {
    return <ContexteBouton.Provider value={{ type, couleur, taille }}>{children}</ContexteBouton.Provider>;
};

const useContexteBouton = () => {
    const context = useContext(ContexteBouton);
    if (context === undefined) {
        return { type: 'normal' };
    }
    return context;
};

export default useContexteBouton;
