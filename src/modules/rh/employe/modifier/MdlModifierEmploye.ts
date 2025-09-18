import { createSelector, createSlice } from '@reduxjs/toolkit';
import { FormInstance } from 'antd';
import { IEmploye } from 'modele/rh/employe/DomaineEmploye';
import { createEtatError, createEtatInit, createEtatPending, createEtatSuccess, IRequete, IResultat, IRootState } from 'waxant';
import CtrlModifierEmploye from './CtrlModifierEmploye';

export interface ReqModifierEmploye extends IRequete {
    form?: FormInstance;
    idEmploye?: string;
}

export interface ResModifierEmploye extends IResultat {
    employe?: IEmploye;
}

const initialState = {
    employe: {} as IEmploye,
    etatMajEmploye: createEtatInit(),
    etatRecupererEmployeParId: createEtatInit(),
};

type ModifierEmployeType = typeof initialState;

const SliceModifierEmploye = createSlice({
    name: 'MdlModifierEmploye',
    initialState,
    reducers: {
        resetEtatMajEmploye(state) {
            state.etatMajEmploye = createEtatInit();
        },
        resetEtatRecupererEmployeParId(state) {
            state.etatRecupererEmployeParId = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlModifierEmploye.majEmploye.fulfilled, (state, action) => {
                state.etatMajEmploye = createEtatSuccess();
            })
            .addCase(CtrlModifierEmploye.majEmploye.pending, (state, action) => {
                state.etatMajEmploye = createEtatPending();
            })
            .addCase(CtrlModifierEmploye.majEmploye.rejected, (state, action) => {
                state.etatMajEmploye = createEtatError();
            })
            .addCase(CtrlModifierEmploye.recupererEmployeParId.fulfilled, (state, action) => {
                state.employe = action.payload.employe;
                state.etatRecupererEmployeParId = createEtatSuccess();
            })
            .addCase(CtrlModifierEmploye.recupererEmployeParId.pending, (state, action) => {
                state.etatRecupererEmployeParId = createEtatPending();
            })
            .addCase(CtrlModifierEmploye.recupererEmployeParId.rejected, (state, action) => {
                state.etatRecupererEmployeParId = createEtatError();
            });
    },
});

export const MdlModifierEmploye = SliceModifierEmploye.actions;

const selectMdlModifierEmploye = (state: IRootState) => state.mdlModifierEmploye;
export const selectEtatMajEmploye = createSelector([selectMdlModifierEmploye], (state: ModifierEmployeType) => state.etatMajEmploye);
export const selectEtatRecupererEmployeParId = createSelector([selectMdlModifierEmploye], (state: ModifierEmployeType) => state.etatRecupererEmployeParId);
export const selectEmploye = createSelector([selectMdlModifierEmploye], (state: ModifierEmployeType) => state.employe);

export default SliceModifierEmploye.reducer;