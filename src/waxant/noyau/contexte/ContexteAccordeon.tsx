import { ReactNode, createContext, useContext, useState } from 'react';

export interface IContexteAccordeonProps {
    ouvert?: string;
    setOuvert?: (id?: string) => void;
}

const ContexteAccordeon = createContext({} as IContexteAccordeonProps);

interface ContexteAccordeonProviderProps {
    ouvertParDefaut?: string;
    children: ReactNode;
}

export const ContexteAccordeonProvider: React.FC<ContexteAccordeonProviderProps> = ({ ouvertParDefaut, children }) => {
    const [ouvert, setOuvert] = useState(ouvertParDefaut);
    return (
        <ContexteAccordeon.Provider value={{ ouvert, setOuvert }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {children}
            </div>
        </ContexteAccordeon.Provider>
    );
};

const useContexteAccordeon = () => {
    const context = useContext(ContexteAccordeon);
    if (context === undefined) {
        throw new Error('useContextePage must be used within a ContexteAccordeonProvider');
    }
    return context;
};

export default useContexteAccordeon;
