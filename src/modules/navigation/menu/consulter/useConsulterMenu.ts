import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlConsulterMenu from './CtrlConsulterMenu';
import { MdlConsulterMenu, type ReqConsulterMenu, type ResConsulterMenu, selectEtatCreerPage, selectEtatListerPage, selectIdPage, selectListePage } from './MdlConsulterMenu';

const useConsulterMenu = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const idPage = useSelector(selectIdPage);
    const listePage = useSelector(selectListePage);
    const etatCreerPage = useSelector(selectEtatCreerPage);
    const etatListerPage = useSelector(selectEtatListerPage);

    const createAction = (action: AsyncThunk<ResConsulterMenu, ReqConsulterMenu, AsyncThunkConfig>) => (req?: ReqConsulterMenu) => dispatch(action({ ...req, ...params } as ReqConsulterMenu));

    return {
        // Actions
        creerPage: createAction(CtrlConsulterMenu.creerPage),
        listerPage: createAction(CtrlConsulterMenu.listerPage),
        resetEtatCreerPage: () => dispatch(MdlConsulterMenu.resetEtatCreerPage()),
        resetEtatListerPage: () => dispatch(MdlConsulterMenu.resetEtatListerPage()),

        // State
        idPage,
        listePage,
        etatCreerPage,
        etatListerPage,
    };
};

export default useConsulterMenu;