import ServiceEmploye from 'modele/rh/employe/ServiceEmploye';
import { action, util } from 'waxant';
import { ActionEmploye } from '../ActionEmploye';
import { type ReqModifierEmploye, type ResModifierEmploye } from './MdlModifierEmploye';

const initModificationEmployeImpl = async (requete: ReqModifierEmploye, resultat: ResModifierEmploye, thunkAPI) => {
    resultat.employe = await ServiceEmploye.recupererParId(requete.idEmploye);
};

const majEmployeImpl = async (requete: ReqModifierEmploye, resultat: ResModifierEmploye, thunkAPI) => {
    await requete.form.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form.getFieldsValue());
    await ServiceEmploye.maj(dataForm);
};

const CtrlModifierEmploye = {
    initModificationEmploye: action<ReqModifierEmploye, ResModifierEmploye>(initModificationEmployeImpl, ActionEmploye.UcModifierEmploye.INIT_MODIFICATION_EMPLOYE),
    majEmploye: action<ReqModifierEmploye, ResModifierEmploye>(majEmployeImpl, ActionEmploye.UcModifierEmploye.MAJ_EMPLOYE),
};

export default CtrlModifierEmploye;