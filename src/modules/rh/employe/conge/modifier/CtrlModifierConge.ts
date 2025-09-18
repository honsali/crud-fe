import ServiceConge from 'modele/rh/conge/ServiceConge';
import { action, util } from 'waxant';
import { ActionEmploye } from '../../ActionEmploye';
import { ReqModifierConge, ResModifierConge } from './MdlModifierConge';

const majCongeImpl = async (requete: ReqModifierConge, resultat: ResModifierConge, thunkAPI) => {
    await requete.form.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form.getFieldsValue());
    await ServiceConge.maj(dataForm);
};

const recupererCongeParIdImpl = async (requete: ReqModifierConge, resultat: ResModifierConge, thunkAPI) => {
    resultat.conge = await ServiceConge.recupererParId(requete.idConge);
};

const CtrlModifierConge = {
    majConge: action<ReqModifierConge, ResModifierConge>(majCongeImpl, ActionEmploye.UcModifierConge.MAJ_CONGE),
    recupererCongeParId: action<ReqModifierConge, ResModifierConge>(recupererCongeParIdImpl, ActionEmploye.UcModifierConge.RECUPERER_CONGE_PAR_ID),
};

export default CtrlModifierConge;