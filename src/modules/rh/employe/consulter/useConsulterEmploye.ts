import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlConsulterEmploye from './CtrlConsulterEmploye';
import { MdlConsulterEmploye, ReqConsulterEmploye, selectEmploye, selectEtatListerCongeParIdEmploye, selectEtatRecupererEmployeParId, selectEtatSupprimerEmploye, selectListeConge } from './MdlConsulterEmploye';

const useConsulterEmploye = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const employe = useSelector(selectEmploye);
    const etatListerCongeParIdEmploye = useSelector(selectEtatListerCongeParIdEmploye);
    const etatRecupererEmployeParId = useSelector(selectEtatRecupererEmployeParId);
    const etatSupprimerEmploye = useSelector(selectEtatSupprimerEmploye);
    const listeConge = useSelector(selectListeConge);

    const createAction = (action: any) => (req?: Partial<ReqConsulterEmploye>) => dispatch(action({ ...req, ...params }));

    return {
        // Actions
        listerCongeParIdEmploye: createAction(CtrlConsulterEmploye.listerCongeParIdEmploye),
        recupererEmployeParId: createAction(CtrlConsulterEmploye.recupererEmployeParId),
        supprimerEmploye: createAction(CtrlConsulterEmploye.supprimerEmploye),
        resetEtatListerCongeParIdEmploye: () => dispatch(MdlConsulterEmploye.resetEtatListerCongeParIdEmploye()),
        resetEtatRecupererEmployeParId: () => dispatch(MdlConsulterEmploye.resetEtatRecupererEmployeParId()),
        resetEtatSupprimerEmploye: () => dispatch(MdlConsulterEmploye.resetEtatSupprimerEmploye()),

        // State
        employe,
        etatListerCongeParIdEmploye,
        etatRecupererEmployeParId,
        etatSupprimerEmploye,
        listeConge,
    };
};

export default useConsulterEmploye;
