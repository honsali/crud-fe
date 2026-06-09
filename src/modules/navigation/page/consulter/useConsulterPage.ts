import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlConsulterPage from './CtrlConsulterPage';
import { MdlConsulterPage, type ReqConsulterPage, type ResConsulterPage, selectEtatRecupererPageParId, selectEtatSupprimerPage, selectPage } from './MdlConsulterPage';

const useConsulterPage = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatRecupererPageParId = useSelector(selectEtatRecupererPageParId);
    const page = useSelector(selectPage);
    const etatSupprimerPage = useSelector(selectEtatSupprimerPage);

    const createAction = (action: AsyncThunk<ResConsulterPage, ReqConsulterPage, AsyncThunkConfig>) => (req?: ReqConsulterPage) => dispatch(action({ ...req, ...params } as ReqConsulterPage));

    return {
        // Actions
        recupererPageParId: createAction(CtrlConsulterPage.recupererPageParId),
        supprimerPage: createAction(CtrlConsulterPage.supprimerPage),
        resetEtatRecupererPageParId: () => dispatch(MdlConsulterPage.resetEtatRecupererPageParId()),
        resetEtatSupprimerPage: () => dispatch(MdlConsulterPage.resetEtatSupprimerPage()),

        // State
        etatRecupererPageParId,
        page,
        etatSupprimerPage,
    };
};

export default useConsulterPage;