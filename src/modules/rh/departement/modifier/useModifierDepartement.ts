import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlModifierDepartement from './CtrlModifierDepartement';
import { MdlModifierDepartement, type ReqModifierDepartement, type ResModifierDepartement, selectDepartement, selectEtatInitModificationDepartement, selectEtatMajDepartement } from './MdlModifierDepartement';

const useModifierDepartement = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatMajDepartement = useSelector(selectEtatMajDepartement);
    const etatInitModificationDepartement = useSelector(selectEtatInitModificationDepartement);
    const departement = useSelector(selectDepartement);

    const createAction = (action: AsyncThunk<ResModifierDepartement, ReqModifierDepartement, AsyncThunkConfig>) => (req?: ReqModifierDepartement) => dispatch(action({ ...req, ...params } as ReqModifierDepartement));

    return {
        // Actions
        initModificationDepartement: createAction(CtrlModifierDepartement.initModificationDepartement),
        majDepartement: createAction(CtrlModifierDepartement.majDepartement),
        resetEtatInitModificationDepartement: () => dispatch(MdlModifierDepartement.resetEtatInitModificationDepartement()),
        resetEtatMajDepartement: () => dispatch(MdlModifierDepartement.resetEtatMajDepartement()),

        // State
        etatMajDepartement,
        etatInitModificationDepartement,
        departement,
    };
};

export default useModifierDepartement;