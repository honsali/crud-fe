import { createContext, useContext, useEffect, useState } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import Avancement from '../../composants/widget/Avancement';
import useContexteAuth from '../auth/ContexteAuth';
import { ConfigAppType } from '../contexte/ContexteApp';
import { listeReducer } from '../routes/PageDefinition';
import getStore, { resetStore } from './StoreDynamique';

export interface IDynamicStoreContextProps {
}

const DynamicStoreContext = createContext<IDynamicStoreContextProps | undefined>(undefined);

export const DynamicStoreProvider = ({ config, children }: { config: ConfigAppType; children: React.ReactNode }) => {
    const { role } = useContexteAuth();
    const [loading, setLoading] = useState(true);
    const [store, setStore] = useState(getStore());
    const [storeRole, setStoreRole] = useState<string>(null);

    useEffect(() => {
        const domaine = role ? config.mapDomaine[role] : null;
        const allReducers = domaine?.listeModule ? listeReducer({}, domaine.listeModule) : {};

        resetStore(allReducers);
        setStore(getStore());
        setStoreRole(role);
        setLoading(false);
    }, [config.mapDomaine, role]);

    if (loading || storeRole !== role) {
        return <Avancement taux={2} />;
    }

    return (
        <DynamicStoreContext.Provider value={{}}>
            <StoreProvider store={store}>{children}</StoreProvider>
        </DynamicStoreContext.Provider>
    );
};

const useDynamicStore = () => {
    const context = useContext(DynamicStoreContext);
    if (context === undefined) {
        throw new Error('useDynamicStore must be used within a DynamicStoreProvider');
    }
    return context;
};

export default useDynamicStore;
