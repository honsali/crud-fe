import ServiceConge from 'modele/rh/conge/ServiceConge';
import { ActionOperation, action, util } from 'waxant';
import { ActionEmploye } from '../../ActionEmploye';
import { ReqModifierConge, ResModifierConge } from './MdlModifierConge';

const initModificationCongeImpl: ActionOperation<ReqModifierConge, ResModifierConge> = async (requete, resultat, _thunkAPI) => {
    resultat.conge = await ServiceConge.recupererParId(requete.idConge);
};

const majCongeImpl: ActionOperation<ReqModifierConge, ResModifierConge> = async (requete, _resultat, _thunkAPI) => {
    await requete.form?.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form?.getFieldsValue());
    await ServiceConge.maj(dataForm);
};

const CtrlModifierConge = {
    initModificationConge: action<ReqModifierConge, ResModifierConge>(initModificationCongeImpl, ActionEmploye.UcModifierConge.INIT_MODIFICATION_CONGE),
    majConge: action<ReqModifierConge, ResModifierConge>(majCongeImpl, ActionEmploye.UcModifierConge.MAJ_CONGE),
};

export default CtrlModifierConge;
