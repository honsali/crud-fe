import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlModifierEmploye from './CtrlModifierEmploye';
import { MdlModifierEmploye, type ReqModifierEmploye, type ResModifierEmploye, selectEmploye, selectEtatInitModificationEmploye, selectEtatMajEmploye } from './MdlModifierEmploye';

const useModifierEmploye = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatInitModificationEmploye = useSelector(selectEtatInitModificationEmploye);
    const etatMajEmploye = useSelector(selectEtatMajEmploye);
    const employe = useSelector(selectEmploye);

    const createAction = (action: AsyncThunk<ResModifierEmploye, ReqModifierEmploye, AsyncThunkConfig>) => (req?: ReqModifierEmploye) => dispatch(action({ ...req, ...params } as ReqModifierEmploye));

    return {
        // Actions
        initModificationEmploye: createAction(CtrlModifierEmploye.initModificationEmploye),
        majEmploye: createAction(CtrlModifierEmploye.majEmploye),
        resetEtatInitModificationEmploye: () => dispatch(MdlModifierEmploye.resetEtatInitModificationEmploye()),
        resetEtatMajEmploye: () => dispatch(MdlModifierEmploye.resetEtatMajEmploye()),

        // State
        etatInitModificationEmploye,
        etatMajEmploye,
        employe,
    };
};

export default useModifierEmploye;