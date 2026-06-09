import ServiceMenu from 'modele/navigation/menu/ServiceMenu';
import { action, util } from 'waxant';
import { ActionNavigation } from '../../ActionNavigation';
import { type ReqListerMenu, type ResListerMenu } from './MdlListerMenu';

const creerMenuImpl = async (requete: ReqListerMenu, resultat: ResListerMenu, thunkAPI) => {
    const { id } = await ServiceMenu.creer(requete.menu.menu.id, requete.menu);
    resultat.idMenu = id;
    await listerMenuImpl(requete, resultat, thunkAPI);
};

const listerMenuImpl = async (requete: ReqListerMenu, resultat: ResListerMenu, thunkAPI) => {
    resultat.listeMenu = await ServiceMenu.lister();
};

const majMenuImpl = async (requete: ReqListerMenu, resultat: ResListerMenu, thunkAPI) => {
    await requete.form?.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form?.getFieldsValue());
    await ServiceMenu.maj(dataForm);
    await listerMenuImpl(requete, resultat, thunkAPI);
};

const supprimerMenuImpl = async (requete: ReqListerMenu, resultat: ResListerMenu, thunkAPI) => {
    await ServiceMenu.supprimer(requete.idMenu);
    await listerMenuImpl(requete, resultat, thunkAPI);
};

const CtrlListerMenu = {
    creerMenu: action<ReqListerMenu, ResListerMenu>(creerMenuImpl, ActionNavigation.UcListerMenu.CREER_MENU),
    listerMenu: action<ReqListerMenu, ResListerMenu>(listerMenuImpl, ActionNavigation.UcListerMenu.LISTER_MENU),
    majMenu: action<ReqListerMenu, ResListerMenu>(majMenuImpl, ActionNavigation.UcListerMenu.MAJ_MENU),
    supprimerMenu: action<ReqListerMenu, ResListerMenu>(supprimerMenuImpl, ActionNavigation.UcListerMenu.SUPPRIMER_MENU),
};

export default CtrlListerMenu;