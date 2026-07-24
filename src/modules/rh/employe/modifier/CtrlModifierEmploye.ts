import ServiceEmploye from 'modele/rh/employe/ServiceEmploye';
import { ActionOperation, action, util } from 'waxant';
import { ActionEmploye } from '../ActionEmploye';
import { ReqModifierEmploye, ResModifierEmploye } from './MdlModifierEmploye';

const initModificationEmployeImpl: ActionOperation<ReqModifierEmploye, ResModifierEmploye> = async (requete, resultat, _thunkAPI) => {
    resultat.employe = await ServiceEmploye.recupererParId(requete.idEmploye);
};

const majEmployeImpl: ActionOperation<ReqModifierEmploye, ResModifierEmploye> = async (requete, _resultat, _thunkAPI) => {
    await requete.form?.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form?.getFieldsValue());
    await ServiceEmploye.maj(dataForm);
};

const CtrlModifierEmploye = {
    initModificationEmploye: action<ReqModifierEmploye, ResModifierEmploye>(initModificationEmployeImpl, ActionEmploye.UcModifierEmploye.INIT_MODIFICATION_EMPLOYE),
    majEmploye: action<ReqModifierEmploye, ResModifierEmploye>(majEmployeImpl, ActionEmploye.UcModifierEmploye.MAJ_EMPLOYE),
};

export default CtrlModifierEmploye;
