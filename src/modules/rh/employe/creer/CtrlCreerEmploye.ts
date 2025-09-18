import ServiceEmploye from 'modele/rh/employe/ServiceEmploye';
import { action, util } from 'waxant';
import { ActionEmploye } from '../ActionEmploye';
import { ReqCreerEmploye, ResCreerEmploye } from './MdlCreerEmploye';

const creerEmployeImpl = async (requete: ReqCreerEmploye, resultat: ResCreerEmploye, thunkAPI) => {
    await requete.form.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form.getFieldsValue());
    const { id } = await ServiceEmploye.creer(dataForm);
    resultat.idEmploye = id;
};

const CtrlCreerEmploye = {
    creerEmploye: action<ReqCreerEmploye, ResCreerEmploye>(creerEmployeImpl, ActionEmploye.UcCreerEmploye.CREER_EMPLOYE),
};

export default CtrlCreerEmploye;