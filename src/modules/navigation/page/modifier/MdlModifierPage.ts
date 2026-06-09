import { createSelector, createSlice } from '@reduxjs/toolkit';
import { type FormInstance } from 'antd';
import { type IPage } from 'modele/navigation/page/DomainePage';
import { type EtatMdl, type IRequete, type IResultat, type IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlModifierPage from './CtrlModifierPage';

export interface ReqModifierPage extends IRequete {
    form?: FormInstance;
    idPage?: string;
}

export interface ResModifierPage extends IResultat {
    page: IPage | {};
}

interface ModifierPageType {
    etatInitModificationPage: EtatMdl;
    etatMajPage: EtatMdl;
    page?: IPage;
}

const initialState: ModifierPageType = {
    etatInitModificationPage: createEtatInit(),
    etatMajPage: createEtatInit(),
    page: {} as IPage,
};

const SliceModifierPage = createSlice({
    name: 'MdlModifierPage',
    initialState,
    reducers: {
        resetEtatInitModificationPage(state) {
            state.etatInitModificationPage = createEtatInit();
        },
        resetEtatMajPage(state) {
            state.etatMajPage = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlModifierPage.initModificationPage.fulfilled, (state, action) => {
                state.page = action.payload.page;
                state.etatInitModificationPage = createEtatSuccess();
            })
            .addCase(CtrlModifierPage.initModificationPage.pending, (state, action) => {
                state.etatInitModificationPage = createEtatPending();
            })
            .addCase(CtrlModifierPage.initModificationPage.rejected, (state, action) => {
                state.etatInitModificationPage = createEtatError();
            })
            .addCase(CtrlModifierPage.majPage.fulfilled, (state, action) => {
                state.etatMajPage = createEtatSuccess();
            })
            .addCase(CtrlModifierPage.majPage.pending, (state, action) => {
                state.etatMajPage = createEtatPending();
            })
            .addCase(CtrlModifierPage.majPage.rejected, (state, action) => {
                state.etatMajPage = createEtatError();
            });
    },
});

export const MdlModifierPage = SliceModifierPage.actions;

const selectMdlModifierPage = (state: IRootState) => state.mdlModifierPage;
export const selectEtatInitModificationPage = createSelector([selectMdlModifierPage], (state: ModifierPageType) => state.etatInitModificationPage);
export const selectEtatMajPage = createSelector([selectMdlModifierPage], (state: ModifierPageType) => state.etatMajPage);
export const selectPage = createSelector([selectMdlModifierPage], (state: ModifierPageType) => state.page);

export default SliceModifierPage.reducer;