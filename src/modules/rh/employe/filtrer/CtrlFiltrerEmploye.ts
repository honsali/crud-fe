import ServiceEmploye from 'modele/rh/employe/ServiceEmploye';
import { action, util } from 'waxant';
import { ActionEmploye } from '../ActionEmploye';
import { type ReqFiltrerEmploye, type ResFiltrerEmploye } from './MdlFiltrerEmploye';

const changerPageFiltrerEmployeImpl = async (requete: ReqFiltrerEmploye, resultat: ResFiltrerEmploye, thunkAPI) => {
    const { mdlFiltrerEmploye } = thunkAPI.getState() as any;
    resultat.listePagineeEmploye = await ServiceEmploye.filtrer(mdlFiltrerEmploye.filtre, requete.pageCourante);
};

const filtrerEmployeImpl = async (requete: ReqFiltrerEmploye, resultat: ResFiltrerEmploye, thunkAPI) => {
    await requete.form.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form.getFieldsValue());
    resultat.listePagineeEmploye = await ServiceEmploye.filtrer(dataForm);
    resultat.filtre = dataForm;
};

const initialiserFiltrerEmployeImpl = async (requete: ReqFiltrerEmploye, resultat: ResFiltrerEmploye, thunkAPI) => {
    resultat.listePagineeEmploye = await ServiceEmploye.filtrer({});
    resultat.filtre = {};
};

const CtrlFiltrerEmploye = {
    changerPageFiltrerEmploye: action<ReqFiltrerEmploye, ResFiltrerEmploye>(changerPageFiltrerEmployeImpl, ActionEmploye.UcFiltrerEmploye.CHANGER_PAGE_FILTRER_EMPLOYE),
    filtrerEmploye: action<ReqFiltrerEmploye, ResFiltrerEmploye>(filtrerEmployeImpl, ActionEmploye.UcFiltrerEmploye.FILTRER_EMPLOYE),
    initialiserFiltrerEmploye: action<ReqFiltrerEmploye, ResFiltrerEmploye>(initialiserFiltrerEmployeImpl, ActionEmploye.UcFiltrerEmploye.INITIALISER_FILTRER_EMPLOYE),
};

export default CtrlFiltrerEmploye;