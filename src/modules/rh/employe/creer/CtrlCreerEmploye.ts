import ServiceEmploye from 'modele/rh/employe/ServiceEmploye';
import { ActionOperation, action } from 'waxant';
import { ActionEmploye } from '../ActionEmploye';
import { ReqCreerEmploye, ResCreerEmploye } from './MdlCreerEmploye';

const creerEmployeImpl: ActionOperation<ReqCreerEmploye, ResCreerEmploye> = async (requete, resultat, _thunkAPI) => {
    const { id } = await ServiceEmploye.creer(requete.request);
    resultat.idEmploye = id;
};

const CtrlCreerEmploye = {
    creerEmploye: action<ReqCreerEmploye, ResCreerEmploye>(creerEmployeImpl, ActionEmploye.UcCreerEmploye.CREER_EMPLOYE),
};

export default CtrlCreerEmploye;
