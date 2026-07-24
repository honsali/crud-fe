import ServiceConge from 'modele/rh/conge/ServiceConge';
import { ActionOperation, action } from 'waxant';
import { ActionEmploye } from '../../ActionEmploye';
import { ReqConsulterConge, ResConsulterConge } from './MdlConsulterConge';

const recupererCongeParIdImpl: ActionOperation<ReqConsulterConge, ResConsulterConge> = async (requete, resultat, _thunkAPI) => {
    resultat.conge = await ServiceConge.recupererParId(requete.idConge);
};

const supprimerCongeImpl: ActionOperation<ReqConsulterConge, ResConsulterConge> = async (requete, _resultat, _thunkAPI) => {
    await ServiceConge.supprimer(requete.idConge);
};

const CtrlConsulterConge = {
    recupererCongeParId: action<ReqConsulterConge, ResConsulterConge>(recupererCongeParIdImpl, ActionEmploye.UcConsulterConge.RECUPERER_CONGE_PAR_ID),
    supprimerConge: action<ReqConsulterConge, ResConsulterConge>(supprimerCongeImpl, ActionEmploye.UcConsulterConge.SUPPRIMER_CONGE),
};

export default CtrlConsulterConge;
