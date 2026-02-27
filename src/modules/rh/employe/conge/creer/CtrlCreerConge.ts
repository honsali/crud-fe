import ServiceConge from 'modele/rh/conge/ServiceConge';
import { action, util } from 'waxant';
import { ActionEmploye } from '../../ActionEmploye';
import { type ReqCreerConge, type ResCreerConge } from './MdlCreerConge';

const creerCongeImpl = async (requete: ReqCreerConge, resultat: ResCreerConge, thunkAPI) => {
    await requete.form.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form.getFieldsValue());
    const { id } = await ServiceConge.creer(requete.idEmploye, dataForm);
    resultat.idConge = id;
};

const CtrlCreerConge = {
    creerConge: action<ReqCreerConge, ResCreerConge>(creerCongeImpl, ActionEmploye.UcCreerConge.CREER_CONGE),
};

export default CtrlCreerConge;