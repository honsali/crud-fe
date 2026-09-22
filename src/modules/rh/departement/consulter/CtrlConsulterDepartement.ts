import ServiceDepartement from 'modele/rh/departement/ServiceDepartement';
import { ActionOperation, action } from 'waxant';
import { ActionDepartement } from '../ActionDepartement';
import { ReqConsulterDepartement, ResConsulterDepartement } from './MdlConsulterDepartement';

const recupererDepartementParIdImpl: ActionOperation<ReqConsulterDepartement, ResConsulterDepartement> = async (requete, resultat, _thunkAPI) => {
    resultat.departement = await ServiceDepartement.recupererParId(requete.idDepartement);
};

const supprimerDepartementImpl: ActionOperation<ReqConsulterDepartement, ResConsulterDepartement> = async (requete, _resultat, _thunkAPI) => {
    await ServiceDepartement.supprimer(requete.idDepartement);
};

const CtrlConsulterDepartement = {
    recupererDepartementParId: action<ReqConsulterDepartement, ResConsulterDepartement>(recupererDepartementParIdImpl, ActionDepartement.UcConsulterDepartement.RECUPERER_DEPARTEMENT_PAR_ID),
    supprimerDepartement: action<ReqConsulterDepartement, ResConsulterDepartement>(supprimerDepartementImpl, ActionDepartement.UcConsulterDepartement.SUPPRIMER_DEPARTEMENT),
};

export default CtrlConsulterDepartement;
