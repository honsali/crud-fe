import { useNavigate, useParams } from 'react-router';
import useContexteAuth from '../auth/ContexteAuth';
import useContexteApp from '../contexte/ContexteApp';

const useGoToModule = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { mapDomaine } = useContexteApp();
    const { role } = useContexteAuth();

    const parse = (nomModule, listeModule) => {
        for (const module of listeModule) {
            if (module.key === nomModule) {
                return module.index;
            } else if (module.listeSousModule?.length) {
                const result = parse(nomModule, module.listeSousModule);
                if (result) {
                    return result;
                }
            }
        }
    };

    return (nomModule: string, args?: any) => {
        if (!role) {
            return;
        }
        const index = parse(nomModule, mapDomaine[role]?.listeModule);
        if (index) {
            navigate(index.toPath({ ...args, ...params }));
        }
    };
};

export default useGoToModule;
