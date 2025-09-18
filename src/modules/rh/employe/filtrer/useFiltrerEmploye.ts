import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlFiltrerEmploye from './CtrlFiltrerEmploye';
import { MdlFiltrerEmploye, ReqFiltrerEmploye, selectEtatChangerPageFiltrerEmploye, selectEtatFiltrerEmploye, selectEtatInitialiserFiltrerEmploye, selectListePagineeEmploye } from './MdlFiltrerEmploye';

const useFiltrerEmploye = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatFiltrerEmploye = useSelector(selectEtatFiltrerEmploye);
    const listePagineeEmploye = useSelector(selectListePagineeEmploye);
    const etatChangerPageFiltrerEmploye = useSelector(selectEtatChangerPageFiltrerEmploye);
    const etatInitialiserFiltrerEmploye = useSelector(selectEtatInitialiserFiltrerEmploye);

    const createAction = (action: any) => (req?: ReqFiltrerEmploye) => dispatch(action({ ...req, ...params }));

    return {
        // Actions
        changerPageFiltrerEmploye: createAction(CtrlFiltrerEmploye.changerPageFiltrerEmploye),
        filtrerEmploye: createAction(CtrlFiltrerEmploye.filtrerEmploye),
        initialiserFiltrerEmploye: createAction(CtrlFiltrerEmploye.initialiserFiltrerEmploye),
        resetEtatChangerPageFiltrerEmploye: () => dispatch(MdlFiltrerEmploye.resetEtatChangerPageFiltrerEmploye()),
        resetEtatFiltrerEmploye: () => dispatch(MdlFiltrerEmploye.resetEtatFiltrerEmploye()),
        resetEtatInitialiserFiltrerEmploye: () => dispatch(MdlFiltrerEmploye.resetEtatInitialiserFiltrerEmploye()),

        // State
        etatFiltrerEmploye,
        listePagineeEmploye,
        etatChangerPageFiltrerEmploye,
        etatInitialiserFiltrerEmploye,
    };
};

export default useFiltrerEmploye;