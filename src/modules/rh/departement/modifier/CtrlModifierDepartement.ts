import ServiceDepartement from 'modele/rh/departement/ServiceDepartement';
import { action, util } from 'waxant';
import { ActionDepartement } from '../ActionDepartement';
import { type ReqModifierDepartement, type ResModifierDepartement } from './MdlModifierDepartement';

const initModificationDepartementImpl = async (requete: ReqModifierDepartement, resultat: ResModifierDepartement, thunkAPI) => {
    resultat.departement = await ServiceDepartement.recupererParId(requete.idDepartement);
};

const majDepartementImpl = async (requete: ReqModifierDepartement, resultat: ResModifierDepartement, thunkAPI) => {
    await requete.form.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form.getFieldsValue());
    await ServiceDepartement.maj(dataForm);
};

const CtrlModifierDepartement = {
    initModificationDepartement: action<ReqModifierDepartement, ResModifierDepartement>(initModificationDepartementImpl, ActionDepartement.UcModifierDepartement.INIT_MODIFICATION_DEPARTEMENT),
    majDepartement: action<ReqModifierDepartement, ResModifierDepartement>(majDepartementImpl, ActionDepartement.UcModifierDepartement.MAJ_DEPARTEMENT),
};

export default CtrlModifierDepartement;