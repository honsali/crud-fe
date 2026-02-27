import ServiceConge from 'modele/rh/conge/ServiceConge';
import { action } from 'waxant';
import { ActionEmploye } from '../../ActionEmploye';
import { type ReqConsulterConge, type ResConsulterConge } from './MdlConsulterConge';

const recupererCongeParIdImpl = async (requete: ReqConsulterConge, resultat: ResConsulterConge, thunkAPI) => {
    resultat.conge = await ServiceConge.recupererParId(requete.idConge);
};

const supprimerCongeImpl = async (requete: ReqConsulterConge, resultat: ResConsulterConge, thunkAPI) => {
    await ServiceConge.supprimer(requete.idConge);
};

const CtrlConsulterConge = {
    recupererCongeParId: action<ReqConsulterConge, ResConsulterConge>(recupererCongeParIdImpl, ActionEmploye.UcConsulterConge.RECUPERER_CONGE_PAR_ID),
    supprimerConge: action<ReqConsulterConge, ResConsulterConge>(supprimerCongeImpl, ActionEmploye.UcConsulterConge.SUPPRIMER_CONGE),
};

export default CtrlConsulterConge;