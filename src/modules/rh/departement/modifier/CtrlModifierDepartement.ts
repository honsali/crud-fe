import ServiceDepartement from 'modele/rh/departement/ServiceDepartement';
import { ActionOperation, action, util } from 'waxant';
import { ActionDepartement } from '../ActionDepartement';
import { ReqModifierDepartement, ResModifierDepartement } from './MdlModifierDepartement';

const initModificationDepartementImpl: ActionOperation<ReqModifierDepartement, ResModifierDepartement> = async (requete, resultat, _thunkAPI) => {
    resultat.departement = await ServiceDepartement.recupererParId(requete.idDepartement);
};

const majDepartementImpl: ActionOperation<ReqModifierDepartement, ResModifierDepartement> = async (requete, _resultat, _thunkAPI) => {
    await requete.form?.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form?.getFieldsValue());
    await ServiceDepartement.maj(dataForm);
};

const CtrlModifierDepartement = {
    initModificationDepartement: action<ReqModifierDepartement, ResModifierDepartement>(initModificationDepartementImpl, ActionDepartement.UcModifierDepartement.INIT_MODIFICATION_DEPARTEMENT),
    majDepartement: action<ReqModifierDepartement, ResModifierDepartement>(majDepartementImpl, ActionDepartement.UcModifierDepartement.MAJ_DEPARTEMENT),
};

export default CtrlModifierDepartement;
