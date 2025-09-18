import ServiceDepartement from 'modele/rh/departement/ServiceDepartement';
import { action, util } from 'waxant';
import { ActionDepartement } from '../ActionDepartement';
import { ReqModifierDepartement, ResModifierDepartement } from './MdlModifierDepartement';

const majDepartementImpl = async (requete: ReqModifierDepartement, resultat: ResModifierDepartement, thunkAPI) => {
    await requete.form.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form.getFieldsValue());
    await ServiceDepartement.maj(dataForm);
};

const recupererDepartementParIdImpl = async (requete: ReqModifierDepartement, resultat: ResModifierDepartement, thunkAPI) => {
    resultat.departement = await ServiceDepartement.recupererParId(requete.idDepartement);
};

const CtrlModifierDepartement = {
    majDepartement: action<ReqModifierDepartement, ResModifierDepartement>(majDepartementImpl, ActionDepartement.UcModifierDepartement.MAJ_DEPARTEMENT),
    recupererDepartementParId: action<ReqModifierDepartement, ResModifierDepartement>(recupererDepartementParIdImpl, ActionDepartement.UcModifierDepartement.RECUPERER_DEPARTEMENT_PAR_ID),
};

export default CtrlModifierDepartement;