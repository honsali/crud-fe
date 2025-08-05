import ServiceDepartement from 'modele/rh/departement/ServiceDepartement';
import { action } from 'waxant';
import { ActionRh } from '../../ActionRh';
import { ReqConsulterDepartement, ResConsulterDepartement } from './MdlConsulterDepartement';

const recupererDepartementParIdImpl = async (requete: ReqConsulterDepartement, resultat: ResConsulterDepartement, thunkAPI) => {
    resultat.departement = await ServiceDepartement.recupererParId(requete.idDepartement);
};

const CtrlConsulterDepartement = {
    recupererDepartementParId: action<ReqConsulterDepartement, ResConsulterDepartement>(recupererDepartementParIdImpl, ActionRh.UcConsulterDepartement.RECUPERER_DEPARTEMENT_PAR_ID),
};

export default CtrlConsulterDepartement;