import { createContext, useContext } from 'react';

export interface IContextePageProps {
    page: any;
}

const ContextePage = createContext({} as IContextePageProps);

export const ContextePageProvider = ({ page, children }) => {
    return <ContextePage.Provider value={page}>{children}</ContextePage.Provider>;
};

const useContextePage = () => {
    const context = useContext(ContextePage);
    if (context === undefined) {
        throw new Error('useContextePage must be used within a ContextePageProvider');
    }
    return context;
};

export default useContextePage;
