import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlConsulterConge from './CtrlConsulterConge';
import { MdlConsulterConge, type ReqConsulterConge, type ResConsulterConge, selectConge, selectEtatRecupererCongeParId, selectEtatSupprimerConge } from './MdlConsulterConge';

const useConsulterConge = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatRecupererCongeParId = useSelector(selectEtatRecupererCongeParId);
    const etatSupprimerConge = useSelector(selectEtatSupprimerConge);
    const conge = useSelector(selectConge);

    const createAction = (action: AsyncThunk<ResConsulterConge, ReqConsulterConge, AsyncThunkConfig>) => (req?: ReqConsulterConge) => dispatch(action({ ...req, ...params } as ReqConsulterConge));

    return {
        // Actions
        recupererCongeParId: createAction(CtrlConsulterConge.recupererCongeParId),
        supprimerConge: createAction(CtrlConsulterConge.supprimerConge),
        resetEtatRecupererCongeParId: () => dispatch(MdlConsulterConge.resetEtatRecupererCongeParId()),
        resetEtatSupprimerConge: () => dispatch(MdlConsulterConge.resetEtatSupprimerConge()),

        // State
        etatRecupererCongeParId,
        etatSupprimerConge,
        conge,
    };
};

export default useConsulterConge;