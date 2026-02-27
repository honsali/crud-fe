import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlModifierConge from './CtrlModifierConge';
import { MdlModifierConge, type ReqModifierConge, type ResModifierConge, selectConge, selectEtatInitModificationConge, selectEtatMajConge } from './MdlModifierConge';

const useModifierConge = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatInitModificationConge = useSelector(selectEtatInitModificationConge);
    const conge = useSelector(selectConge);
    const etatMajConge = useSelector(selectEtatMajConge);

    const createAction = (action: AsyncThunk<ResModifierConge, ReqModifierConge, AsyncThunkConfig>) => (req?: ReqModifierConge) => dispatch(action({ ...req, ...params } as ReqModifierConge));

    return {
        // Actions
        initModificationConge: createAction(CtrlModifierConge.initModificationConge),
        majConge: createAction(CtrlModifierConge.majConge),
        resetEtatInitModificationConge: () => dispatch(MdlModifierConge.resetEtatInitModificationConge()),
        resetEtatMajConge: () => dispatch(MdlModifierConge.resetEtatMajConge()),

        // State
        etatInitModificationConge,
        conge,
        etatMajConge,
    };
};

export default useModifierConge;