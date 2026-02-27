import { createSelector, createSlice } from '@reduxjs/toolkit';
import { type FormInstance } from 'antd';
import { type IDepartement } from 'modele/rh/departement/DomaineDepartement';
import { type EtatMdl, type IRequete, type IResultat, type IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlModifierDepartement from './CtrlModifierDepartement';

export interface ReqModifierDepartement extends IRequete {
    form?: FormInstance;
    idDepartement?: string;
}

export interface ResModifierDepartement extends IResultat {
    departement: IDepartement | {};
}

interface ModifierDepartementType {
    departement?: IDepartement;
    etatInitModificationDepartement: EtatMdl;
    etatMajDepartement: EtatMdl;
}

const initialState: ModifierDepartementType = {
    departement: {} as IDepartement,
    etatInitModificationDepartement: createEtatInit(),
    etatMajDepartement: createEtatInit(),
};

const SliceModifierDepartement = createSlice({
    name: 'MdlModifierDepartement',
    initialState,
    reducers: {
        resetEtatInitModificationDepartement(state) {
            state.etatInitModificationDepartement = createEtatInit();
        },
        resetEtatMajDepartement(state) {
            state.etatMajDepartement = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlModifierDepartement.initModificationDepartement.fulfilled, (state, action) => {
                state.departement = action.payload.departement;
                state.etatInitModificationDepartement = createEtatSuccess();
            })
            .addCase(CtrlModifierDepartement.initModificationDepartement.pending, (state, action) => {
                state.etatInitModificationDepartement = createEtatPending();
            })
            .addCase(CtrlModifierDepartement.initModificationDepartement.rejected, (state, action) => {
                state.etatInitModificationDepartement = createEtatError();
            })
            .addCase(CtrlModifierDepartement.majDepartement.fulfilled, (state, action) => {
                state.etatMajDepartement = createEtatSuccess();
            })
            .addCase(CtrlModifierDepartement.majDepartement.pending, (state, action) => {
                state.etatMajDepartement = createEtatPending();
            })
            .addCase(CtrlModifierDepartement.majDepartement.rejected, (state, action) => {
                state.etatMajDepartement = createEtatError();
            });
    },
});

export const MdlModifierDepartement = SliceModifierDepartement.actions;

const selectMdlModifierDepartement = (state: IRootState) => state.mdlModifierDepartement;
export const selectEtatMajDepartement = createSelector([selectMdlModifierDepartement], (state: ModifierDepartementType) => state.etatMajDepartement);
export const selectEtatInitModificationDepartement = createSelector([selectMdlModifierDepartement], (state: ModifierDepartementType) => state.etatInitModificationDepartement);
export const selectDepartement = createSelector([selectMdlModifierDepartement], (state: ModifierDepartementType) => state.departement);

export default SliceModifierDepartement.reducer;