import ServicePage from 'modele/navigation/page/ServicePage';
import { action, util } from 'waxant';
import { ActionPage } from '../ActionPage';
import { type ReqModifierPage, type ResModifierPage } from './MdlModifierPage';

const initModificationPageImpl = async (requete: ReqModifierPage, resultat: ResModifierPage, thunkAPI) => {
    resultat.page = await ServicePage.recupererParId(requete.idPage);
};

const majPageImpl = async (requete: ReqModifierPage, resultat: ResModifierPage, thunkAPI) => {
    await requete.form?.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form?.getFieldsValue());
    await ServicePage.maj(dataForm);
};

const CtrlModifierPage = {
    initModificationPage: action<ReqModifierPage, ResModifierPage>(initModificationPageImpl, ActionPage.UcModifierPage.INIT_MODIFICATION_PAGE),
    majPage: action<ReqModifierPage, ResModifierPage>(majPageImpl, ActionPage.UcModifierPage.MAJ_PAGE),
};

export default CtrlModifierPage;