import ServiceDepartement from 'modele/rh/departement/ServiceDepartement';
import { action } from 'waxant';
import { ActionDepartement } from '../ActionDepartement';
import { type ReqConsulterDepartement, type ResConsulterDepartement } from './MdlConsulterDepartement';

const recupererDepartementParIdImpl = async (requete: ReqConsulterDepartement, resultat: ResConsulterDepartement, thunkAPI) => {
    resultat.departement = await ServiceDepartement.recupererParId(requete.idDepartement);
};

const supprimerDepartementImpl = async (requete: ReqConsulterDepartement, resultat: ResConsulterDepartement, thunkAPI) => {
    await ServiceDepartement.supprimer(requete.idDepartement);
};

const CtrlConsulterDepartement = {
    recupererDepartementParId: action<ReqConsulterDepartement, ResConsulterDepartement>(recupererDepartementParIdImpl, ActionDepartement.UcConsulterDepartement.RECUPERER_DEPARTEMENT_PAR_ID),
    supprimerDepartement: action<ReqConsulterDepartement, ResConsulterDepartement>(supprimerDepartementImpl, ActionDepartement.UcConsulterDepartement.SUPPRIMER_DEPARTEMENT),
};

export default CtrlConsulterDepartement;