import ServiceDepartement from 'modele/rh/departement/ServiceDepartement';
import { action, util } from 'waxant';
import { ActionRh } from '../../ActionRh';
import { ReqCreerDepartement, ResCreerDepartement } from './MdlCreerDepartement';

const creerDepartementImpl = async (requete: ReqCreerDepartement, resultat: ResCreerDepartement, thunkAPI) => {
    await requete.form.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form.getFieldsValue());
    resultat.idDepartement = await ServiceDepartement.creer(dataForm);
};

const CtrlCreerDepartement = {
    creerDepartement: action<ReqCreerDepartement, ResCreerDepartement>(creerDepartementImpl, ActionRh.UcCreerDepartement.CREER_DEPARTEMENT),
};

export default CtrlCreerDepartement;