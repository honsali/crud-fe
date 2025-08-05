import { MapDomaineType } from 'waxant';
import ListeModuleInvite from './invite/modules';

const mapDomaine: Record<string, MapDomaineType> = {
    invite: {
        listeModule: ListeModuleInvite,
    },
};

export default mapDomaine;
