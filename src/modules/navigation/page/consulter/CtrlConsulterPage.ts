import ServicePage from 'modele/navigation/page/ServicePage';
import { action } from 'waxant';
import { ActionPage } from '../ActionPage';
import { type ReqConsulterPage, type ResConsulterPage } from './MdlConsulterPage';

const recupererPageParIdImpl = async (requete: ReqConsulterPage, resultat: ResConsulterPage, thunkAPI) => {
    resultat.page = await ServicePage.recupererParId(requete.idPage);
};

const supprimerPageImpl = async (requete: ReqConsulterPage, resultat: ResConsulterPage, thunkAPI) => {
    await ServicePage.supprimer(requete.idPage);
};

const CtrlConsulterPage = {
    recupererPageParId: action<ReqConsulterPage, ResConsulterPage>(recupererPageParIdImpl, ActionPage.UcConsulterPage.RECUPERER_PAGE_PAR_ID),
    supprimerPage: action<ReqConsulterPage, ResConsulterPage>(supprimerPageImpl, ActionPage.UcConsulterPage.SUPPRIMER_PAGE),
};

export default CtrlConsulterPage;