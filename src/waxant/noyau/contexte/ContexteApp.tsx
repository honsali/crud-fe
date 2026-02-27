import { createContext, useContext } from 'react';
import { type ModuleDefinition } from '../routes/ModuleDefinition';

export type MapDomaineType = {
    listeModule?: ModuleDefinition[];
};

export interface ConfigAppType {
    appName: string;
    langue: string;
    formatDate: string;
    formatDateTime: string;
    apiTimeout: number;
    theme: Record<string, any>;
    mapDroitAcces: Record<string, string[]>;
    mapRole: Record<string, string>;
    mapDomaine: Record<string, MapDomaineType>;
    listerReference: (params: any) => Promise<any>;
}

export const ContexteApp = createContext({} as ConfigAppType);

export const ContexteAppProvider = ({ config, children }) => {
    return <ContexteApp.Provider value={config}>{children}</ContexteApp.Provider>;
};

const useContexteApp = () => {
    const context = useContext(ContexteApp);
    if (context === undefined) {
        throw new Error('useContexteApp must be used within a ContexteAppProvider');
    }

    return context;
};

export default useContexteApp;
