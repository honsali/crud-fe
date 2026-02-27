import ServiceConge from 'modele/rh/conge/ServiceConge';
import { action, util } from 'waxant';
import { ActionEmploye } from '../../ActionEmploye';
import { type ReqModifierConge, type ResModifierConge } from './MdlModifierConge';

const initModificationCongeImpl = async (requete: ReqModifierConge, resultat: ResModifierConge, thunkAPI) => {
    resultat.conge = await ServiceConge.recupererParId(requete.idConge);
};

const majCongeImpl = async (requete: ReqModifierConge, resultat: ResModifierConge, thunkAPI) => {
    await requete.form.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form.getFieldsValue());
    await ServiceConge.maj(dataForm);
};

const CtrlModifierConge = {
    initModificationConge: action<ReqModifierConge, ResModifierConge>(initModificationCongeImpl, ActionEmploye.UcModifierConge.INIT_MODIFICATION_CONGE),
    majConge: action<ReqModifierConge, ResModifierConge>(majCongeImpl, ActionEmploye.UcModifierConge.MAJ_CONGE),
};

export default CtrlModifierConge;