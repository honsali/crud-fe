import { ReactNode, createContext, useContext } from 'react';

export interface IContexteViewProps {
    uc: string;
}

const ContexteView = createContext<IContexteViewProps | undefined>(undefined);

interface ContexteViewProviderProps {
    uc: string;
    children: ReactNode;
}

export const ContexteViewProvider: React.FC<ContexteViewProviderProps> = ({ uc, children }) => {
    return <ContexteView.Provider value={{ uc }}>{children}</ContexteView.Provider>;
};

const useContexteView = () => {
    const context = useContext(ContexteView);
    if (context === undefined) {
        throw new Error('useContexteView must be used within a ContexteViewProvider');
    }
    return context;
};

export default useContexteView;
