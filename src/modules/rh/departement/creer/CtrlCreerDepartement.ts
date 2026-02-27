import ServiceDepartement from 'modele/rh/departement/ServiceDepartement';
import { action, util } from 'waxant';
import { ActionDepartement } from '../ActionDepartement';
import { type ReqCreerDepartement, type ResCreerDepartement } from './MdlCreerDepartement';

const creerDepartementImpl = async (requete: ReqCreerDepartement, resultat: ResCreerDepartement, thunkAPI) => {
    await requete.form.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form.getFieldsValue());
    const { id } = await ServiceDepartement.creer(dataForm);
    resultat.idDepartement = id;
};

const CtrlCreerDepartement = {
    creerDepartement: action<ReqCreerDepartement, ResCreerDepartement>(creerDepartementImpl, ActionDepartement.UcCreerDepartement.CREER_DEPARTEMENT),
};

export default CtrlCreerDepartement;