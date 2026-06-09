import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlListerPage from './CtrlListerPage';
import { MdlListerPage, type ReqListerPage, type ResListerPage, selectEtatListerPage, selectListePage } from './MdlListerPage';

const useListerPage = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const listePage = useSelector(selectListePage);
    const etatListerPage = useSelector(selectEtatListerPage);

    const createAction = (action: AsyncThunk<ResListerPage, ReqListerPage, AsyncThunkConfig>) => (req?: ReqListerPage) => dispatch(action({ ...req, ...params } as ReqListerPage));

    return {
        // Actions
        listerPage: createAction(CtrlListerPage.listerPage),
        resetEtatListerPage: () => dispatch(MdlListerPage.resetEtatListerPage()),

        // State
        listePage,
        etatListerPage,
    };
};

export default useListerPage;