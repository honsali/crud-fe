import { createSelector, createSlice } from '@reduxjs/toolkit';
import { type FormInstance } from 'antd';
import { type IEmploye } from 'modele/rh/employe/DomaineEmploye';
import { type EtatMdl, type IRequete, type IResultat, type IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlModifierEmploye from './CtrlModifierEmploye';

export interface ReqModifierEmploye extends IRequete {
    form?: FormInstance;
    idEmploye?: string;
}

export interface ResModifierEmploye extends IResultat {
    employe: IEmploye | {};
}

interface ModifierEmployeType {
    employe?: IEmploye;
    etatInitModificationEmploye: EtatMdl;
    etatMajEmploye: EtatMdl;
}

const initialState: ModifierEmployeType = {
    employe: {} as IEmploye,
    etatInitModificationEmploye: createEtatInit(),
    etatMajEmploye: createEtatInit(),
};

const SliceModifierEmploye = createSlice({
    name: 'MdlModifierEmploye',
    initialState,
    reducers: {
        resetEtatInitModificationEmploye(state) {
            state.etatInitModificationEmploye = createEtatInit();
        },
        resetEtatMajEmploye(state) {
            state.etatMajEmploye = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlModifierEmploye.initModificationEmploye.fulfilled, (state, action) => {
                state.employe = action.payload.employe;
                state.etatInitModificationEmploye = createEtatSuccess();
            })
            .addCase(CtrlModifierEmploye.initModificationEmploye.pending, (state, action) => {
                state.etatInitModificationEmploye = createEtatPending();
            })
            .addCase(CtrlModifierEmploye.initModificationEmploye.rejected, (state, action) => {
                state.etatInitModificationEmploye = createEtatError();
            })
            .addCase(CtrlModifierEmploye.majEmploye.fulfilled, (state, action) => {
                state.etatMajEmploye = createEtatSuccess();
            })
            .addCase(CtrlModifierEmploye.majEmploye.pending, (state, action) => {
                state.etatMajEmploye = createEtatPending();
            })
            .addCase(CtrlModifierEmploye.majEmploye.rejected, (state, action) => {
                state.etatMajEmploye = createEtatError();
            });
    },
});

export const MdlModifierEmploye = SliceModifierEmploye.actions;

const selectMdlModifierEmploye = (state: IRootState) => state.mdlModifierEmploye;
export const selectEtatInitModificationEmploye = createSelector([selectMdlModifierEmploye], (state: ModifierEmployeType) => state.etatInitModificationEmploye);
export const selectEtatMajEmploye = createSelector([selectMdlModifierEmploye], (state: ModifierEmployeType) => state.etatMajEmploye);
export const selectEmploye = createSelector([selectMdlModifierEmploye], (state: ModifierEmployeType) => state.employe);

export default SliceModifierEmploye.reducer;