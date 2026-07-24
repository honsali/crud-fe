import ServiceEmploye from 'modele/rh/employe/ServiceEmploye';
import { ActionOperation, action, util } from 'waxant';
import { ActionEmploye } from '../ActionEmploye';
import { ReqFiltrerEmploye, ResFiltrerEmploye } from './MdlFiltrerEmploye';

const changerPageFiltrerEmployeImpl: ActionOperation<ReqFiltrerEmploye, ResFiltrerEmploye> = async (requete, resultat, thunkAPI) => {
    const { mdlFiltrerEmploye } = thunkAPI.getState() as any;
    resultat.listePagineeEmploye = await ServiceEmploye.filtrer(mdlFiltrerEmploye.filtre, requete.pageCourante);
};

const filtrerEmployeImpl: ActionOperation<ReqFiltrerEmploye, ResFiltrerEmploye> = async (requete, resultat, _thunkAPI) => {
    const dataForm = util.removeNonSerialisable(requete.form?.getFieldsValue());
    resultat.listePagineeEmploye = await ServiceEmploye.filtrer(dataForm);
    resultat.filtre = dataForm;
};

const initialiserFiltrerEmployeImpl: ActionOperation<ReqFiltrerEmploye, ResFiltrerEmploye> = async (_requete, resultat, _thunkAPI) => {
    resultat.listePagineeEmploye = await ServiceEmploye.filtrer({});
    resultat.filtre = {};
};

const CtrlFiltrerEmploye = {
    changerPageFiltrerEmploye: action<ReqFiltrerEmploye, ResFiltrerEmploye>(changerPageFiltrerEmployeImpl, ActionEmploye.UcFiltrerEmploye.CHANGER_PAGE_FILTRER_EMPLOYE),
    filtrerEmploye: action<ReqFiltrerEmploye, ResFiltrerEmploye>(filtrerEmployeImpl, ActionEmploye.UcFiltrerEmploye.FILTRER_EMPLOYE),
    initialiserFiltrerEmploye: action<ReqFiltrerEmploye, ResFiltrerEmploye>(initialiserFiltrerEmployeImpl, ActionEmploye.UcFiltrerEmploye.INITIALISER_FILTRER_EMPLOYE),
};

export default CtrlFiltrerEmploye;
