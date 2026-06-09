import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlModifierPage from './CtrlModifierPage';
import { MdlModifierPage, type ReqModifierPage, type ResModifierPage, selectEtatInitModificationPage, selectEtatMajPage, selectPage } from './MdlModifierPage';

const useModifierPage = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatInitModificationPage = useSelector(selectEtatInitModificationPage);
    const etatMajPage = useSelector(selectEtatMajPage);
    const page = useSelector(selectPage);

    const createAction = (action: AsyncThunk<ResModifierPage, ReqModifierPage, AsyncThunkConfig>) => (req?: ReqModifierPage) => dispatch(action({ ...req, ...params } as ReqModifierPage));

    return {
        // Actions
        initModificationPage: createAction(CtrlModifierPage.initModificationPage),
        majPage: createAction(CtrlModifierPage.majPage),
        resetEtatInitModificationPage: () => dispatch(MdlModifierPage.resetEtatInitModificationPage()),
        resetEtatMajPage: () => dispatch(MdlModifierPage.resetEtatMajPage()),

        // State
        etatInitModificationPage,
        etatMajPage,
        page,
    };
};

export default useModifierPage;