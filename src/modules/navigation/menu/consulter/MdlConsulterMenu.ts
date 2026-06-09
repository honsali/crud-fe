import { createSelector, createSlice } from '@reduxjs/toolkit';
import { type FormInstance } from 'antd';
import { type IPage } from 'modele/navigation/page/DomainePage';
import { type EtatMdl, type IRequete, type IResultat, type IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlConsulterMenu from './CtrlConsulterMenu';

export interface ReqConsulterMenu extends IRequete {
    form?: FormInstance;
}

export interface ResConsulterMenu extends IResultat {
    idPage?: string;
    listePage?: IPage[];
}

interface ConsulterMenuType {
    etatCreerPage: EtatMdl;
    etatListerPage: EtatMdl;
    idPage?: string;
    listePage?: IPage[];
}

const initialState: ConsulterMenuType = {
    etatCreerPage: createEtatInit(),
    etatListerPage: createEtatInit(),
    listePage: [] as IPage[],
};

const SliceConsulterMenu = createSlice({
    name: 'MdlConsulterMenu',
    initialState,
    reducers: {
        resetEtatCreerPage(state) {
            state.etatCreerPage = createEtatInit();
        },
        resetEtatListerPage(state) {
            state.etatListerPage = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlConsulterMenu.creerPage.fulfilled, (state, action) => {
                state.idPage = action.payload.idPage;
                state.listePage = action.payload.listePage;
                state.etatCreerPage = createEtatSuccess();
            })
            .addCase(CtrlConsulterMenu.creerPage.pending, (state, action) => {
                state.etatCreerPage = createEtatPending();
            })
            .addCase(CtrlConsulterMenu.creerPage.rejected, (state, action) => {
                state.etatCreerPage = createEtatError();
            })
            .addCase(CtrlConsulterMenu.listerPage.fulfilled, (state, action) => {
                state.listePage = action.payload.listePage;
                state.etatListerPage = createEtatSuccess();
            })
            .addCase(CtrlConsulterMenu.listerPage.pending, (state, action) => {
                state.etatListerPage = createEtatPending();
            })
            .addCase(CtrlConsulterMenu.listerPage.rejected, (state, action) => {
                state.etatListerPage = createEtatError();
            });
    },
});

export const MdlConsulterMenu = SliceConsulterMenu.actions;

const selectMdlConsulterMenu = (state: IRootState) => state.mdlConsulterMenu;
export const selectIdPage = createSelector([selectMdlConsulterMenu], (state: ConsulterMenuType) => state.idPage);
export const selectListePage = createSelector([selectMdlConsulterMenu], (state: ConsulterMenuType) => state.listePage);
export const selectEtatCreerPage = createSelector([selectMdlConsulterMenu], (state: ConsulterMenuType) => state.etatCreerPage);
export const selectEtatListerPage = createSelector([selectMdlConsulterMenu], (state: ConsulterMenuType) => state.etatListerPage);

export default SliceConsulterMenu.reducer;