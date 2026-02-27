import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlConsulterEmploye from './CtrlConsulterEmploye';
import { MdlConsulterEmploye, type ReqConsulterEmploye, type ResConsulterEmploye, selectEmploye, selectEtatListerCongeParIdEmploye, selectEtatRecupererEmployeParId, selectEtatSupprimerEmploye, selectListeConge } from './MdlConsulterEmploye';

const useConsulterEmploye = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatRecupererEmployeParId = useSelector(selectEtatRecupererEmployeParId);
    const etatSupprimerEmploye = useSelector(selectEtatSupprimerEmploye);
    const etatListerCongeParIdEmploye = useSelector(selectEtatListerCongeParIdEmploye);
    const employe = useSelector(selectEmploye);
    const listeConge = useSelector(selectListeConge);

    const createAction = (action: AsyncThunk<ResConsulterEmploye, ReqConsulterEmploye, AsyncThunkConfig>) => (req?: ReqConsulterEmploye) => dispatch(action({ ...req, ...params } as ReqConsulterEmploye));

    return {
        // Actions
        listerCongeParIdEmploye: createAction(CtrlConsulterEmploye.listerCongeParIdEmploye),
        recupererEmployeParId: createAction(CtrlConsulterEmploye.recupererEmployeParId),
        supprimerEmploye: createAction(CtrlConsulterEmploye.supprimerEmploye),
        resetEtatListerCongeParIdEmploye: () => dispatch(MdlConsulterEmploye.resetEtatListerCongeParIdEmploye()),
        resetEtatRecupererEmployeParId: () => dispatch(MdlConsulterEmploye.resetEtatRecupererEmployeParId()),
        resetEtatSupprimerEmploye: () => dispatch(MdlConsulterEmploye.resetEtatSupprimerEmploye()),

        // State
        etatRecupererEmployeParId,
        etatSupprimerEmploye,
        etatListerCongeParIdEmploye,
        employe,
        listeConge,
    };
};

export default useConsulterEmploye;