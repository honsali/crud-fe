import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlCreerPage from './CtrlCreerPage';
import { MdlCreerPage, type ReqCreerPage, type ResCreerPage, selectEtatCreerPage, selectIdPage } from './MdlCreerPage';

const useCreerPage = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const idPage = useSelector(selectIdPage);
    const etatCreerPage = useSelector(selectEtatCreerPage);

    const createAction = (action: AsyncThunk<ResCreerPage, ReqCreerPage, AsyncThunkConfig>) => (req?: ReqCreerPage) => dispatch(action({ ...req, ...params } as ReqCreerPage));

    return {
        // Actions
        creerPage: createAction(CtrlCreerPage.creerPage),
        resetEtatCreerPage: () => dispatch(MdlCreerPage.resetEtatCreerPage()),

        // State
        idPage,
        etatCreerPage,
    };
};

export default useCreerPage;