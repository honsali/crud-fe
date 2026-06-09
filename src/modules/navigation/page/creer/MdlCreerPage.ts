import { createSelector, createSlice } from '@reduxjs/toolkit';
import { type FormInstance } from 'antd';
import { type EtatMdl, type IRequete, type IResultat, type IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlCreerPage from './CtrlCreerPage';

export interface ReqCreerPage extends IRequete {
    form?: FormInstance;
}

export interface ResCreerPage extends IResultat {
    idPage?: string;
}

interface CreerPageType {
    etatCreerPage: EtatMdl;
    idPage?: string;
}

const initialState: CreerPageType = {
    etatCreerPage: createEtatInit(),
};

const SliceCreerPage = createSlice({
    name: 'MdlCreerPage',
    initialState,
    reducers: {
        resetEtatCreerPage(state) {
            state.etatCreerPage = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlCreerPage.creerPage.fulfilled, (state, action) => {
                state.idPage = action.payload.idPage;
                state.etatCreerPage = createEtatSuccess();
            })
            .addCase(CtrlCreerPage.creerPage.pending, (state, action) => {
                state.etatCreerPage = createEtatPending();
            })
            .addCase(CtrlCreerPage.creerPage.rejected, (state, action) => {
                state.etatCreerPage = createEtatError();
            });
    },
});

export const MdlCreerPage = SliceCreerPage.actions;

const selectMdlCreerPage = (state: IRootState) => state.mdlCreerPage;
export const selectIdPage = createSelector([selectMdlCreerPage], (state: CreerPageType) => state.idPage);
export const selectEtatCreerPage = createSelector([selectMdlCreerPage], (state: CreerPageType) => state.etatCreerPage);

export default SliceCreerPage.reducer;