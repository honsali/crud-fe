import { createSelector, createSlice } from '@reduxjs/toolkit';
import { type IPage } from 'modele/navigation/page/DomainePage';
import { type EtatMdl, type IRequete, type IResultat, type IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlListerPage from './CtrlListerPage';

export interface ReqListerPage extends IRequete {
}

export interface ResListerPage extends IResultat {
    listePage?: IPage[];
}

interface ListerPageType {
    etatListerPage: EtatMdl;
    listePage?: IPage[];
}

const initialState: ListerPageType = {
    etatListerPage: createEtatInit(),
    listePage: [] as IPage[],
};

const SliceListerPage = createSlice({
    name: 'MdlListerPage',
    initialState,
    reducers: {
        resetEtatListerPage(state) {
            state.etatListerPage = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlListerPage.listerPage.fulfilled, (state, action) => {
                state.listePage = action.payload.listePage;
                state.etatListerPage = createEtatSuccess();
            })
            .addCase(CtrlListerPage.listerPage.pending, (state, action) => {
                state.etatListerPage = createEtatPending();
            })
            .addCase(CtrlListerPage.listerPage.rejected, (state, action) => {
                state.etatListerPage = createEtatError();
            });
    },
});

export const MdlListerPage = SliceListerPage.actions;

const selectMdlListerPage = (state: IRootState) => state.mdlListerPage;
export const selectListePage = createSelector([selectMdlListerPage], (state: ListerPageType) => state.listePage);
export const selectEtatListerPage = createSelector([selectMdlListerPage], (state: ListerPageType) => state.etatListerPage);

export default SliceListerPage.reducer;