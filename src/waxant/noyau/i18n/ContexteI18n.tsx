import _ from 'lodash';
import { createContext, useContext, useEffect, useState } from 'react';
import Avancement from 'waxant/composants/widget/Avancement';
import useContexteAuth from '../auth/ContexteAuth';
import { ConfigAppType } from '../contexte/ContexteApp';
import useAppDispatch from '../redux/useAppDispatch';
import { ModuleDefinition } from '../routes/ModuleDefinition';
import { MdlI18n } from './MdlI18n';

export interface IContexteI18nProps {
    config: ConfigAppType;
}

const ContexteI18n = createContext({} as IContexteI18nProps);

interface ContexteI18nProviderProps {
    config: ConfigAppType;
    children: React.ReactNode;
}

export const ContexteI18nProvider: React.FC<ContexteI18nProviderProps> = ({ config, children }: { config: ConfigAppType; children: React.ReactNode }) => {
    const { role } = useContexteAuth();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const domaine = config.mapDomaine[role];
        const listeModule = domaine?.listeModule;
        const sum = _.reduce(
            listeModule,
            (acc, module) => {
                const moduleI18N = mergeI18N(module);
                return { ...acc, ...moduleI18N };
            },
            {}
        );

        dispatch(MdlI18n.etendreLibelle(sum));
        setLoading(false);
    }, []);

    if (loading) {
        return <Avancement taux={4} />;
    }
    return <ContexteI18n.Provider value={{ config }}>{children}</ContexteI18n.Provider>;
};

const mergeI18N = (module: ModuleDefinition) => {
    let result = { ...module.mapI18n };

    if (module.listeSousModule?.length) {
        for (const sousModule of module.listeSousModule) {
            const sousModuleI18N = mergeI18N(sousModule);
            result = { ...result, ...sousModuleI18N };
        }
    }

    return result;
};
const useContexteI18n = () => {
    const context = useContext(ContexteI18n);
    if (context === undefined) {
        throw new Error('useContexteI18n must be used within a ContexteI18nProvider');
    }
    return context;
};

export default useContexteI18n;
