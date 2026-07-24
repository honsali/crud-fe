import ServiceConge from 'modele/rh/conge/ServiceConge';
import { ActionOperation, action, util } from 'waxant';
import { ActionEmploye } from '../../ActionEmploye';
import { ReqCreerConge, ResCreerConge } from './MdlCreerConge';

const creerCongeImpl: ActionOperation<ReqCreerConge, ResCreerConge> = async (requete, resultat, _thunkAPI) => {
    await requete.form?.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form?.getFieldsValue());
    const { id } = await ServiceConge.creer(requete.idEmploye, dataForm);
    resultat.idConge = id;
};

const CtrlCreerConge = {
    creerConge: action<ReqCreerConge, ResCreerConge>(creerCongeImpl, ActionEmploye.UcCreerConge.CREER_CONGE),
};

export default CtrlCreerConge;
