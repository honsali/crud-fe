import ServiceDepartement from 'modele/rh/departement/ServiceDepartement';
import { action, util } from 'waxant';
import { ActionRh } from '../../ActionRh';
import { ReqModifierDepartement, ResModifierDepartement } from './MdlModifierDepartement';

const enregistrerDepartementImpl = async (requete: ReqModifierDepartement, resultat: ResModifierDepartement, thunkAPI) => {
    await requete.form.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form.getFieldsValue());
    await ServiceDepartement.enregistrer(dataForm);
};

const initModificationDepartementImpl = async (requete: ReqModifierDepartement, resultat: ResModifierDepartement, thunkAPI) => {
    resultat.departement = await ServiceDepartement.recupererParId(requete.idDepartement);
};

const CtrlModifierDepartement = {
    enregistrerDepartement: action<ReqModifierDepartement, ResModifierDepartement>(enregistrerDepartementImpl, ActionRh.UcModifierDepartement.ENREGISTRER_DEPARTEMENT),
    initModificationDepartement: action<ReqModifierDepartement, ResModifierDepartement>(initModificationDepartementImpl, ActionRh.UcModifierDepartement.INIT_MODIFICATION_DEPARTEMENT),
};

export default CtrlModifierDepartement;