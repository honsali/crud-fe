import { createSelector, createSlice } from '@reduxjs/toolkit';
import { FormInstance } from 'antd';
import { IConge } from 'modele/rh/conge/DomaineConge';
import { createEtatError, createEtatInit, createEtatPending, createEtatSuccess, IRequete, IResultat, IRootState } from 'waxant';
import CtrlModifierConge from './CtrlModifierConge';

export interface ReqModifierConge extends IRequete {
    form?: FormInstance;
    idConge?: string;
}

export interface ResModifierConge extends IResultat {
    conge?: IConge;
}

const initialState = {
    conge: {} as IConge,
    etatMajConge: createEtatInit(),
    etatRecupererCongeParId: createEtatInit(),
};

type ModifierCongeType = typeof initialState;

const SliceModifierConge = createSlice({
    name: 'MdlModifierConge',
    initialState,
    reducers: {
        resetEtatMajConge(state) {
            state.etatMajConge = createEtatInit();
        },
        resetEtatRecupererCongeParId(state) {
            state.etatRecupererCongeParId = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlModifierConge.majConge.fulfilled, (state, action) => {
                state.etatMajConge = createEtatSuccess();
            })
            .addCase(CtrlModifierConge.majConge.pending, (state, action) => {
                state.etatMajConge = createEtatPending();
            })
            .addCase(CtrlModifierConge.majConge.rejected, (state, action) => {
                state.etatMajConge = createEtatError();
            })
            .addCase(CtrlModifierConge.recupererCongeParId.fulfilled, (state, action) => {
                state.conge = action.payload.conge;
                state.etatRecupererCongeParId = createEtatSuccess();
            })
            .addCase(CtrlModifierConge.recupererCongeParId.pending, (state, action) => {
                state.etatRecupererCongeParId = createEtatPending();
            })
            .addCase(CtrlModifierConge.recupererCongeParId.rejected, (state, action) => {
                state.etatRecupererCongeParId = createEtatError();
            });
    },
});

export const MdlModifierConge = SliceModifierConge.actions;

const selectMdlModifierConge = (state: IRootState) => state.mdlModifierConge;
export const selectEtatRecupererCongeParId = createSelector([selectMdlModifierConge], (state: ModifierCongeType) => state.etatRecupererCongeParId);
export const selectConge = createSelector([selectMdlModifierConge], (state: ModifierCongeType) => state.conge);
export const selectEtatMajConge = createSelector([selectMdlModifierConge], (state: ModifierCongeType) => state.etatMajConge);

export default SliceModifierConge.reducer;