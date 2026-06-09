import ServicePage from 'modele/navigation/page/ServicePage';
import { action } from 'waxant';
import { ActionPage } from '../ActionPage';
import { type ReqListerPage, type ResListerPage } from './MdlListerPage';

const listerPageImpl = async (requete: ReqListerPage, resultat: ResListerPage, thunkAPI) => {
    resultat.listePage = await ServicePage.lister();
};

const CtrlListerPage = {
    listerPage: action<ReqListerPage, ResListerPage>(listerPageImpl, ActionPage.UcListerPage.LISTER_PAGE),
};

export default CtrlListerPage;