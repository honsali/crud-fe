import { createSelector, createSlice } from '@reduxjs/toolkit';
import { FormInstance } from 'antd';
import { IDepartement } from 'modele/rh/departement/DomaineDepartement';
import { createEtatError, createEtatInit, createEtatPending, createEtatSuccess, IRequete, IResultat, IRootState } from 'waxant';
import CtrlModifierDepartement from './CtrlModifierDepartement';

export interface ReqModifierDepartement extends IRequete {
    form?: FormInstance;
    idDepartement?: string;
}

export interface ResModifierDepartement extends IResultat {
    departement?: IDepartement;
}

const initialState = {
    departement: {} as IDepartement,
    etatMajDepartement: createEtatInit(),
    etatRecupererDepartementParId: createEtatInit(),
};

type ModifierDepartementType = typeof initialState;

const SliceModifierDepartement = createSlice({
    name: 'MdlModifierDepartement',
    initialState,
    reducers: {
        resetEtatMajDepartement(state) {
            state.etatMajDepartement = createEtatInit();
        },
        resetEtatRecupererDepartementParId(state) {
            state.etatRecupererDepartementParId = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlModifierDepartement.majDepartement.fulfilled, (state, action) => {
                state.etatMajDepartement = createEtatSuccess();
            })
            .addCase(CtrlModifierDepartement.majDepartement.pending, (state, action) => {
                state.etatMajDepartement = createEtatPending();
            })
            .addCase(CtrlModifierDepartement.majDepartement.rejected, (state, action) => {
                state.etatMajDepartement = createEtatError();
            })
            .addCase(CtrlModifierDepartement.recupererDepartementParId.fulfilled, (state, action) => {
                state.departement = action.payload.departement;
                state.etatRecupererDepartementParId = createEtatSuccess();
            })
            .addCase(CtrlModifierDepartement.recupererDepartementParId.pending, (state, action) => {
                state.etatRecupererDepartementParId = createEtatPending();
            })
            .addCase(CtrlModifierDepartement.recupererDepartementParId.rejected, (state, action) => {
                state.etatRecupererDepartementParId = createEtatError();
            });
    },
});

export const MdlModifierDepartement = SliceModifierDepartement.actions;

const selectMdlModifierDepartement = (state: IRootState) => state.mdlModifierDepartement;
export const selectEtatMajDepartement = createSelector([selectMdlModifierDepartement], (state: ModifierDepartementType) => state.etatMajDepartement);
export const selectEtatRecupererDepartementParId = createSelector([selectMdlModifierDepartement], (state: ModifierDepartementType) => state.etatRecupererDepartementParId);
export const selectDepartement = createSelector([selectMdlModifierDepartement], (state: ModifierDepartementType) => state.departement);

export default SliceModifierDepartement.reducer;