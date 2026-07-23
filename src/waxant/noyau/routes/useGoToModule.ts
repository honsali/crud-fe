import { useNavigate, useParams } from 'react-router-dom';
import useContexteAuth from '../auth/ContexteAuth';
import useContexteApp from '../contexte/ContexteApp';
import type { ModuleDefinition } from './ModuleDefinition';
import type { PageDefinition } from './PageDefinition';

const findModuleIndex = (moduleName: string, modules: ModuleDefinition[]): PageDefinition | undefined => {
    for (const module of modules) {
        if (module.key === moduleName) {
            return module.index;
        }

        const nestedIndex = findModuleIndex(moduleName, module.listeSousModule ?? []);
        if (nestedIndex) {
            return nestedIndex;
        }
    }
    return undefined;
};

const useGoToModule = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { mapDomaine } = useContexteApp();
    const { role } = useContexteAuth();

    return (moduleName: string, args?: any) => {
        const modules = role ? mapDomaine[role]?.listeModule ?? [] : [];
        const index = findModuleIndex(moduleName, modules);
        if (index) {
            navigate(index.toPath({ ...args, ...params }));
        }
    };
};

export default useGoToModule;
