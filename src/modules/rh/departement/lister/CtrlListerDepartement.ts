import ServiceDepartement from 'modele/rh/departement/ServiceDepartement';
import { ActionOperation, action } from 'waxant';
import { ActionDepartement } from '../ActionDepartement';
import { ReqListerDepartement, ResListerDepartement } from './MdlListerDepartement';

const listerDepartementImpl: ActionOperation<ReqListerDepartement, ResListerDepartement> = async (_requete, resultat, _thunkAPI) => {
    resultat.listeDepartement = await ServiceDepartement.lister();
};

const CtrlListerDepartement = {
    listerDepartement: action<ReqListerDepartement, ResListerDepartement>(listerDepartementImpl, ActionDepartement.UcListerDepartement.LISTER_DEPARTEMENT),
};

export default CtrlListerDepartement;
