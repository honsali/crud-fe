import { createSelector, createSlice } from '@reduxjs/toolkit';
import { IConge } from 'modele/rh/conge/DomaineConge';
import { EtatMdl, IRequete, IResultat, IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlCreerConge from './CtrlCreerConge';

export interface ReqCreerConge extends IRequete {
    idEmploye: string;
    request: IConge;
}

export interface ResCreerConge extends IResultat {
    idConge?: string;
}

interface CreerCongeType {
    etatCreerConge: EtatMdl;
    idConge?: string;
}

const initialState: CreerCongeType = {
    etatCreerConge: createEtatInit(),
};

const SliceCreerConge = createSlice({
    name: 'MdlCreerConge',
    initialState,
    reducers: {
        resetEtatCreerConge(state) {
            state.etatCreerConge = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlCreerConge.creerConge.fulfilled, (state, action) => {
                state.idConge = action.payload.idConge;
                state.etatCreerConge = createEtatSuccess();
            })
            .addCase(CtrlCreerConge.creerConge.pending, (state) => {
                state.etatCreerConge = createEtatPending();
            })
            .addCase(CtrlCreerConge.creerConge.rejected, (state) => {
                state.etatCreerConge = createEtatError();
            });
    },
});

export const MdlCreerConge = SliceCreerConge.actions;

const selectMdlCreerConge = (state: IRootState) => state.mdlCreerConge;
export const selectEtatCreerConge = createSelector([selectMdlCreerConge], (state: CreerCongeType) => state.etatCreerConge);
export const selectIdConge = createSelector([selectMdlCreerConge], (state: CreerCongeType) => state.idConge);

export default SliceCreerConge.reducer;
