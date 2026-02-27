import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlCreerDepartement from './CtrlCreerDepartement';
import { MdlCreerDepartement, type ReqCreerDepartement, type ResCreerDepartement, selectEtatCreerDepartement, selectIdDepartement } from './MdlCreerDepartement';

const useCreerDepartement = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatCreerDepartement = useSelector(selectEtatCreerDepartement);
    const idDepartement = useSelector(selectIdDepartement);

    const createAction = (action: AsyncThunk<ResCreerDepartement, ReqCreerDepartement, AsyncThunkConfig>) => (req?: ReqCreerDepartement) => dispatch(action({ ...req, ...params } as ReqCreerDepartement));

    return {
        // Actions
        creerDepartement: createAction(CtrlCreerDepartement.creerDepartement),
        resetEtatCreerDepartement: () => dispatch(MdlCreerDepartement.resetEtatCreerDepartement()),

        // State
        etatCreerDepartement,
        idDepartement,
    };
};

export default useCreerDepartement;