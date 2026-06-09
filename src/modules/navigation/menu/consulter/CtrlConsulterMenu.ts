import ServicePage from 'modele/navigation/page/ServicePage';
import { action, util } from 'waxant';
import { ActionNavigation } from '../../ActionNavigation';
import { type ReqConsulterMenu, type ResConsulterMenu } from './MdlConsulterMenu';

const creerPageImpl = async (requete: ReqConsulterMenu, resultat: ResConsulterMenu, thunkAPI) => {
    await requete.form.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form.getFieldsValue());
    const { id } = await ServicePage.creer(dataForm);
    resultat.idPage = id;
    await listerPageImpl(requete, resultat, thunkAPI);
};

const listerPageImpl = async (requete: ReqConsulterMenu, resultat: ResConsulterMenu, thunkAPI) => {
    resultat.listePage = await ServicePage.lister();
};

const CtrlConsulterMenu = {
    creerPage: action<ReqConsulterMenu, ResConsulterMenu>(creerPageImpl, ActionNavigation.UcConsulterMenu.CREER_PAGE),
    listerPage: action<ReqConsulterMenu, ResConsulterMenu>(listerPageImpl, ActionNavigation.UcConsulterMenu.LISTER_PAGE),
};

export default CtrlConsulterMenu;