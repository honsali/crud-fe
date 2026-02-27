import { createSelector, createSlice } from '@reduxjs/toolkit';
import { type FormInstance } from 'antd';
import { type IConge } from 'modele/rh/conge/DomaineConge';
import { type EtatMdl, type IRequete, type IResultat, type IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlModifierConge from './CtrlModifierConge';

export interface ReqModifierConge extends IRequete {
    form?: FormInstance;
    idConge?: string;
}

export interface ResModifierConge extends IResultat {
    conge: IConge | {};
}

interface ModifierCongeType {
    conge?: IConge;
    etatInitModificationConge: EtatMdl;
    etatMajConge: EtatMdl;
}

const initialState: ModifierCongeType = {
    conge: {} as IConge,
    etatInitModificationConge: createEtatInit(),
    etatMajConge: createEtatInit(),
};

const SliceModifierConge = createSlice({
    name: 'MdlModifierConge',
    initialState,
    reducers: {
        resetEtatInitModificationConge(state) {
            state.etatInitModificationConge = createEtatInit();
        },
        resetEtatMajConge(state) {
            state.etatMajConge = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlModifierConge.initModificationConge.fulfilled, (state, action) => {
                state.conge = action.payload.conge;
                state.etatInitModificationConge = createEtatSuccess();
            })
            .addCase(CtrlModifierConge.initModificationConge.pending, (state, action) => {
                state.etatInitModificationConge = createEtatPending();
            })
            .addCase(CtrlModifierConge.initModificationConge.rejected, (state, action) => {
                state.etatInitModificationConge = createEtatError();
            })
            .addCase(CtrlModifierConge.majConge.fulfilled, (state, action) => {
                state.etatMajConge = createEtatSuccess();
            })
            .addCase(CtrlModifierConge.majConge.pending, (state, action) => {
                state.etatMajConge = createEtatPending();
            })
            .addCase(CtrlModifierConge.majConge.rejected, (state, action) => {
                state.etatMajConge = createEtatError();
            });
    },
});

export const MdlModifierConge = SliceModifierConge.actions;

const selectMdlModifierConge = (state: IRootState) => state.mdlModifierConge;
export const selectEtatInitModificationConge = createSelector([selectMdlModifierConge], (state: ModifierCongeType) => state.etatInitModificationConge);
export const selectConge = createSelector([selectMdlModifierConge], (state: ModifierCongeType) => state.conge);
export const selectEtatMajConge = createSelector([selectMdlModifierConge], (state: ModifierCongeType) => state.etatMajConge);

export default SliceModifierConge.reducer;