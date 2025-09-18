import ServiceEmploye from 'modele/rh/employe/ServiceEmploye';
import { action, util } from 'waxant';
import { ActionEmploye } from '../ActionEmploye';
import { ReqModifierEmploye, ResModifierEmploye } from './MdlModifierEmploye';

const majEmployeImpl = async (requete: ReqModifierEmploye, resultat: ResModifierEmploye, thunkAPI) => {
    await requete.form.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form.getFieldsValue());
    await ServiceEmploye.maj(dataForm);
};

const recupererEmployeParIdImpl = async (requete: ReqModifierEmploye, resultat: ResModifierEmploye, thunkAPI) => {
    resultat.employe = await ServiceEmploye.recupererParId(requete.idEmploye);
};

const CtrlModifierEmploye = {
    majEmploye: action<ReqModifierEmploye, ResModifierEmploye>(majEmployeImpl, ActionEmploye.UcModifierEmploye.MAJ_EMPLOYE),
    recupererEmployeParId: action<ReqModifierEmploye, ResModifierEmploye>(recupererEmployeParIdImpl, ActionEmploye.UcModifierEmploye.RECUPERER_EMPLOYE_PAR_ID),
};

export default CtrlModifierEmploye;