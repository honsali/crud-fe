import { FormInstance } from 'antd';
import { IRequeteEmploye } from 'modele/rh/employe/DomaineEmploye';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch, util } from 'waxant';
import CtrlFiltrerEmploye from './CtrlFiltrerEmploye';
import { MdlFiltrerEmploye, ReqFiltrerEmploye, selectEtatChangerPageFiltrerEmploye, selectEtatFiltrerEmploye, selectEtatInitialiserFiltrerEmploye, selectListePagineeEmploye } from './MdlFiltrerEmploye';

const useFiltrerEmploye = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatChangerPageFiltrerEmploye = useSelector(selectEtatChangerPageFiltrerEmploye);
    const etatFiltrerEmploye = useSelector(selectEtatFiltrerEmploye);
    const etatInitialiserFiltrerEmploye = useSelector(selectEtatInitialiserFiltrerEmploye);
    const listePagineeEmploye = useSelector(selectListePagineeEmploye);

    const createAction = (action: any) => (req?: Partial<ReqFiltrerEmploye>) => dispatch(action({ ...req, ...params }));

    const filtrerEmploye = async ({ form, ...req }: Partial<ReqFiltrerEmploye> & { form: FormInstance<IRequeteEmploye> }) => {
        const filtre = util.removeNonSerialisable(form.getFieldsValue()) as IRequeteEmploye;
        return dispatch(CtrlFiltrerEmploye.filtrerEmploye({ ...req, filtre, ...params } as ReqFiltrerEmploye));
    };

    return {
        // Actions
        changerPageFiltrerEmploye: createAction(CtrlFiltrerEmploye.changerPageFiltrerEmploye),
        filtrerEmploye,
        initialiserFiltrerEmploye: createAction(CtrlFiltrerEmploye.initialiserFiltrerEmploye),
        resetEtatChangerPageFiltrerEmploye: () => dispatch(MdlFiltrerEmploye.resetEtatChangerPageFiltrerEmploye()),
        resetEtatFiltrerEmploye: () => dispatch(MdlFiltrerEmploye.resetEtatFiltrerEmploye()),
        resetEtatInitialiserFiltrerEmploye: () => dispatch(MdlFiltrerEmploye.resetEtatInitialiserFiltrerEmploye()),

        // State
        etatChangerPageFiltrerEmploye,
        etatFiltrerEmploye,
        etatInitialiserFiltrerEmploye,
        listePagineeEmploye,
    };
};

export default useFiltrerEmploye;
