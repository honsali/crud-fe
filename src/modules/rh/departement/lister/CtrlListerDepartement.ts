import ServiceDepartement from 'modele/rh/departement/ServiceDepartement';
import { action } from 'waxant';
import { ActionDepartement } from '../ActionDepartement';
import { type ReqListerDepartement, type ResListerDepartement } from './MdlListerDepartement';

const listerDepartementImpl = async (requete: ReqListerDepartement, resultat: ResListerDepartement, thunkAPI) => {
    resultat.listeDepartement = await ServiceDepartement.lister();
};

const CtrlListerDepartement = {
    listerDepartement: action<ReqListerDepartement, ResListerDepartement>(listerDepartementImpl, ActionDepartement.UcListerDepartement.LISTER_DEPARTEMENT),
};

export default CtrlListerDepartement;