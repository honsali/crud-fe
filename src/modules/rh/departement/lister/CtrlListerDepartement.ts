import ServiceDepartement from 'modele/rh/departement/ServiceDepartement';
import { action } from 'waxant';
import { ActionRh } from '../../ActionRh';
import { ReqListerDepartement, ResListerDepartement } from './MdlListerDepartement';

const listerDepartementImpl = async (requete: ReqListerDepartement, resultat: ResListerDepartement, thunkAPI) => {
    resultat.listeDepartement = await ServiceDepartement.lister();
};

const CtrlListerDepartement = {
    listerDepartement: action<ReqListerDepartement, ResListerDepartement>(listerDepartementImpl, ActionRh.UcListerDepartement.LISTER_DEPARTEMENT),
};

export default CtrlListerDepartement;