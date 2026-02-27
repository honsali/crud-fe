import { createContext, useContext, useEffect, useState } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import Avancement from 'waxant/composants/widget/Avancement';
import useContexteAuth from '../auth/ContexteAuth';
import { type ConfigAppType } from '../contexte/ContexteApp';
import { listeReducer } from '../routes/PageDefinition';
import getStore, { registerReducer } from './StoreDynamique';


const DynamicStoreContext = createContext({});

export const DynamicStoreProvider = ({ config, children }: { config: ConfigAppType; children: React.ReactNode }) => {
    const { role } = useContexteAuth();
    const [loading, setLoading] = useState(true);
    const [store, setStore] = useState(getStore());

    useEffect(() => {
        if (!role) {
            return;
        }
        const domaine = config.mapDomaine[role];
        const listeModule = domaine?.listeModule;
        const allReducers = listeReducer({}, listeModule);
        registerReducer(allReducers);
        setStore(getStore());
        setLoading(false);
    }, []);

    if (loading) {
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
        throw new Error('useContextePage must be used within a ContextePage');
    }
    return context;
};

export default useDynamicStore;
