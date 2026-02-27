import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlConsulterDepartement from './CtrlConsulterDepartement';
import { MdlConsulterDepartement, type ReqConsulterDepartement, type ResConsulterDepartement, selectDepartement, selectEtatRecupererDepartementParId, selectEtatSupprimerDepartement } from './MdlConsulterDepartement';

const useConsulterDepartement = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatRecupererDepartementParId = useSelector(selectEtatRecupererDepartementParId);
    const departement = useSelector(selectDepartement);
    const etatSupprimerDepartement = useSelector(selectEtatSupprimerDepartement);

    const createAction = (action: AsyncThunk<ResConsulterDepartement, ReqConsulterDepartement, AsyncThunkConfig>) => (req?: ReqConsulterDepartement) => dispatch(action({ ...req, ...params } as ReqConsulterDepartement));

    return {
        // Actions
        recupererDepartementParId: createAction(CtrlConsulterDepartement.recupererDepartementParId),
        supprimerDepartement: createAction(CtrlConsulterDepartement.supprimerDepartement),
        resetEtatRecupererDepartementParId: () => dispatch(MdlConsulterDepartement.resetEtatRecupererDepartementParId()),
        resetEtatSupprimerDepartement: () => dispatch(MdlConsulterDepartement.resetEtatSupprimerDepartement()),

        // State
        etatRecupererDepartementParId,
        departement,
        etatSupprimerDepartement,
    };
};

export default useConsulterDepartement;