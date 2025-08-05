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
    etatEnregistrerDepartement: createEtatInit(),
    etatInitModificationDepartement: createEtatInit(),
};

type ModifierDepartementType = typeof initialState;

const SliceModifierDepartement = createSlice({
    name: 'MdlModifierDepartement',
    initialState,
    reducers: {
        resetEtatEnregistrerDepartement(state) {
            state.etatEnregistrerDepartement = createEtatInit();
        },
        resetEtatInitModificationDepartement(state) {
            state.etatInitModificationDepartement = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlModifierDepartement.enregistrerDepartement.fulfilled, (state, action) => {
                state.etatEnregistrerDepartement = createEtatSuccess();
            })
            .addCase(CtrlModifierDepartement.enregistrerDepartement.pending, (state, action) => {
                state.etatEnregistrerDepartement = createEtatPending();
            })
            .addCase(CtrlModifierDepartement.enregistrerDepartement.rejected, (state, action) => {
                state.etatEnregistrerDepartement = createEtatError();
            })
            .addCase(CtrlModifierDepartement.initModificationDepartement.fulfilled, (state, action) => {
                state.departement = action.payload.departement;
                state.etatInitModificationDepartement = createEtatSuccess();
            })
            .addCase(CtrlModifierDepartement.initModificationDepartement.pending, (state, action) => {
                state.etatInitModificationDepartement = createEtatPending();
            })
            .addCase(CtrlModifierDepartement.initModificationDepartement.rejected, (state, action) => {
                state.etatInitModificationDepartement = createEtatError();
            });
    },
});

export const MdlModifierDepartement = SliceModifierDepartement.actions;

const selectMdlModifierDepartement = (state: IRootState) => state.mdlModifierDepartement;
export const selectEtatInitModificationDepartement = createSelector([selectMdlModifierDepartement], (state: ModifierDepartementType) => state.etatInitModificationDepartement);
export const selectDepartement = createSelector([selectMdlModifierDepartement], (state: ModifierDepartementType) => state.departement);
export const selectEtatEnregistrerDepartement = createSelector([selectMdlModifierDepartement], (state: ModifierDepartementType) => state.etatEnregistrerDepartement);

export default SliceModifierDepartement.reducer;