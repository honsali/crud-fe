import { ROLE_ADMIN, ROLE_GESTIONNAIRE_RH } from 'commun/securite/mapRole';
import type { MapDomaineType } from 'waxant';
import ListeModuleAdmin from './admin/modules';
import ListeModuleRh from './rh/modules';

const mapDomaine: Record<string, MapDomaineType> = {
    [ROLE_GESTIONNAIRE_RH]: {
        listeModule: ListeModuleRh,
    },
    [ROLE_ADMIN]: {
        listeModule: ListeModuleAdmin,
    },
};

export default mapDomaine;
