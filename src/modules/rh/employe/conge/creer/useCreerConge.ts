import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlCreerConge from './CtrlCreerConge';
import { MdlCreerConge, type ReqCreerConge, type ResCreerConge, selectEtatCreerConge, selectIdConge } from './MdlCreerConge';

const useCreerConge = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const idConge = useSelector(selectIdConge);
    const etatCreerConge = useSelector(selectEtatCreerConge);

    const createAction = (action: AsyncThunk<ResCreerConge, ReqCreerConge, AsyncThunkConfig>) => (req?: ReqCreerConge) => dispatch(action({ ...req, ...params } as ReqCreerConge));

    return {
        // Actions
        creerConge: createAction(CtrlCreerConge.creerConge),
        resetEtatCreerConge: () => dispatch(MdlCreerConge.resetEtatCreerConge()),

        // State
        idConge,
        etatCreerConge,
    };
};

export default useCreerConge;