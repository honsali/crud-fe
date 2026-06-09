import { createSelector, createSlice } from '@reduxjs/toolkit';
import { type IPage } from 'modele/navigation/page/DomainePage';
import { type EtatMdl, type IRequete, type IResultat, type IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlConsulterPage from './CtrlConsulterPage';

export interface ReqConsulterPage extends IRequete {
    idPage?: string;
}

export interface ResConsulterPage extends IResultat {
    page: IPage | {};
}

interface ConsulterPageType {
    etatRecupererPageParId: EtatMdl;
    etatSupprimerPage: EtatMdl;
    page?: IPage;
}

const initialState: ConsulterPageType = {
    etatRecupererPageParId: createEtatInit(),
    etatSupprimerPage: createEtatInit(),
    page: {} as IPage,
};

const SliceConsulterPage = createSlice({
    name: 'MdlConsulterPage',
    initialState,
    reducers: {
        resetEtatRecupererPageParId(state) {
            state.etatRecupererPageParId = createEtatInit();
        },
        resetEtatSupprimerPage(state) {
            state.etatSupprimerPage = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlConsulterPage.recupererPageParId.fulfilled, (state, action) => {
                state.page = action.payload.page;
                state.etatRecupererPageParId = createEtatSuccess();
            })
            .addCase(CtrlConsulterPage.recupererPageParId.pending, (state, action) => {
                state.etatRecupererPageParId = createEtatPending();
            })
            .addCase(CtrlConsulterPage.recupererPageParId.rejected, (state, action) => {
                state.etatRecupererPageParId = createEtatError();
            })
            .addCase(CtrlConsulterPage.supprimerPage.fulfilled, (state, action) => {
                state.etatSupprimerPage = createEtatSuccess();
            })
            .addCase(CtrlConsulterPage.supprimerPage.pending, (state, action) => {
                state.etatSupprimerPage = createEtatPending();
            })
            .addCase(CtrlConsulterPage.supprimerPage.rejected, (state, action) => {
                state.etatSupprimerPage = createEtatError();
            });
    },
});

export const MdlConsulterPage = SliceConsulterPage.actions;

const selectMdlConsulterPage = (state: IRootState) => state.mdlConsulterPage;
export const selectEtatRecupererPageParId = createSelector([selectMdlConsulterPage], (state: ConsulterPageType) => state.etatRecupererPageParId);
export const selectPage = createSelector([selectMdlConsulterPage], (state: ConsulterPageType) => state.page);
export const selectEtatSupprimerPage = createSelector([selectMdlConsulterPage], (state: ConsulterPageType) => state.etatSupprimerPage);

export default SliceConsulterPage.reducer;