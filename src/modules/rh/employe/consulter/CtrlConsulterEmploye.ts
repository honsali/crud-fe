import ServiceConge from 'modele/rh/conge/ServiceConge';
import ServiceEmploye from 'modele/rh/employe/ServiceEmploye';
import { ActionOperation, action } from 'waxant';
import { ActionEmploye } from '../ActionEmploye';
import { ReqConsulterEmploye, ResConsulterEmploye } from './MdlConsulterEmploye';

const listerCongeParIdEmployeImpl: ActionOperation<ReqConsulterEmploye, ResConsulterEmploye> = async (requete, resultat, _thunkAPI) => {
    resultat.listeConge = await ServiceConge.listerParIdEmploye(requete.idEmploye);
};

const recupererEmployeParIdImpl: ActionOperation<ReqConsulterEmploye, ResConsulterEmploye> = async (requete, resultat, _thunkAPI) => {
    resultat.employe = await ServiceEmploye.recupererParId(requete.idEmploye);
};

const supprimerEmployeImpl: ActionOperation<ReqConsulterEmploye, ResConsulterEmploye> = async (requete, _resultat, _thunkAPI) => {
    await ServiceEmploye.supprimer(requete.idEmploye);
};

const CtrlConsulterEmploye = {
    listerCongeParIdEmploye: action<ReqConsulterEmploye, ResConsulterEmploye>(listerCongeParIdEmployeImpl, ActionEmploye.UcConsulterEmploye.LISTER_CONGE_PAR_ID_EMPLOYE),
    recupererEmployeParId: action<ReqConsulterEmploye, ResConsulterEmploye>(recupererEmployeParIdImpl, ActionEmploye.UcConsulterEmploye.RECUPERER_EMPLOYE_PAR_ID),
    supprimerEmploye: action<ReqConsulterEmploye, ResConsulterEmploye>(supprimerEmployeImpl, ActionEmploye.UcConsulterEmploye.SUPPRIMER_EMPLOYE),
};

export default CtrlConsulterEmploye;
