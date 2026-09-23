import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlConsulterConge from './CtrlConsulterConge';
import { MdlConsulterConge, ReqConsulterConge, selectConge, selectEtatRecupererCongeParId, selectEtatSupprimerConge } from './MdlConsulterConge';

const useConsulterConge = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const conge = useSelector(selectConge);
    const etatRecupererCongeParId = useSelector(selectEtatRecupererCongeParId);
    const etatSupprimerConge = useSelector(selectEtatSupprimerConge);

    const createAction = (action: any) => (req?: Partial<ReqConsulterConge>) => dispatch(action({ ...req, ...params }));

    return {
        // Actions
        recupererCongeParId: createAction(CtrlConsulterConge.recupererCongeParId),
        supprimerConge: createAction(CtrlConsulterConge.supprimerConge),
        resetEtatRecupererCongeParId: () => dispatch(MdlConsulterConge.resetEtatRecupererCongeParId()),
        resetEtatSupprimerConge: () => dispatch(MdlConsulterConge.resetEtatSupprimerConge()),

        // State
        conge,
        etatRecupererCongeParId,
        etatSupprimerConge,
    };
};

export default useConsulterConge;
