import ServiceDepartement from 'modele/rh/departement/ServiceDepartement';
import { ActionOperation, action } from 'waxant';
import { ActionDepartement } from '../ActionDepartement';
import { ReqCreerDepartement, ResCreerDepartement } from './MdlCreerDepartement';

const creerDepartementImpl: ActionOperation<ReqCreerDepartement, ResCreerDepartement> = async (requete, resultat, _thunkAPI) => {
    const { id } = await ServiceDepartement.creer(requete.request);
    resultat.idDepartement = id;
};

const CtrlCreerDepartement = {
    creerDepartement: action<ReqCreerDepartement, ResCreerDepartement>(creerDepartementImpl, ActionDepartement.UcCreerDepartement.CREER_DEPARTEMENT),
};

export default CtrlCreerDepartement;
