import ServicePage from 'modele/navigation/page/ServicePage';
import { action, util } from 'waxant';
import { ActionPage } from '../ActionPage';
import { type ReqCreerPage, type ResCreerPage } from './MdlCreerPage';

const creerPageImpl = async (requete: ReqCreerPage, resultat: ResCreerPage, thunkAPI) => {
    await requete.form?.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form?.getFieldsValue());
    const { id } = await ServicePage.creer(dataForm);
    resultat.idPage = id;
};

const CtrlCreerPage = {
    creerPage: action<ReqCreerPage, ResCreerPage>(creerPageImpl, ActionPage.UcCreerPage.CREER_PAGE),
};

export default CtrlCreerPage;