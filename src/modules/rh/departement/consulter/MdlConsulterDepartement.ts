import { createSelector, createSlice } from '@reduxjs/toolkit';
import { type IDepartement } from 'modele/rh/departement/DomaineDepartement';
import { type EtatMdl, type IRequete, type IResultat, type IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlConsulterDepartement from './CtrlConsulterDepartement';

export interface ReqConsulterDepartement extends IRequete {
    idDepartement?: string;
}

export interface ResConsulterDepartement extends IResultat {
    departement: IDepartement | {};
}

interface ConsulterDepartementType {
    departement?: IDepartement;
    etatRecupererDepartementParId: EtatMdl;
    etatSupprimerDepartement: EtatMdl;
}

const initialState: ConsulterDepartementType = {
    departement: {} as IDepartement,
    etatRecupererDepartementParId: createEtatInit(),
    etatSupprimerDepartement: createEtatInit(),
};

const SliceConsulterDepartement = createSlice({
    name: 'MdlConsulterDepartement',
    initialState,
    reducers: {
        resetEtatRecupererDepartementParId(state) {
            state.etatRecupererDepartementParId = createEtatInit();
        },
        resetEtatSupprimerDepartement(state) {
            state.etatSupprimerDepartement = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlConsulterDepartement.recupererDepartementParId.fulfilled, (state, action) => {
                state.departement = action.payload.departement;
                state.etatRecupererDepartementParId = createEtatSuccess();
            })
            .addCase(CtrlConsulterDepartement.recupererDepartementParId.pending, (state, action) => {
                state.etatRecupererDepartementParId = createEtatPending();
            })
            .addCase(CtrlConsulterDepartement.recupererDepartementParId.rejected, (state, action) => {
                state.etatRecupererDepartementParId = createEtatError();
            })
            .addCase(CtrlConsulterDepartement.supprimerDepartement.fulfilled, (state, action) => {
                state.etatSupprimerDepartement = createEtatSuccess();
            })
            .addCase(CtrlConsulterDepartement.supprimerDepartement.pending, (state, action) => {
                state.etatSupprimerDepartement = createEtatPending();
            })
            .addCase(CtrlConsulterDepartement.supprimerDepartement.rejected, (state, action) => {
                state.etatSupprimerDepartement = createEtatError();
            });
    },
});

export const MdlConsulterDepartement = SliceConsulterDepartement.actions;

const selectMdlConsulterDepartement = (state: IRootState) => state.mdlConsulterDepartement;
export const selectEtatRecupererDepartementParId = createSelector([selectMdlConsulterDepartement], (state: ConsulterDepartementType) => state.etatRecupererDepartementParId);
export const selectDepartement = createSelector([selectMdlConsulterDepartement], (state: ConsulterDepartementType) => state.departement);
export const selectEtatSupprimerDepartement = createSelector([selectMdlConsulterDepartement], (state: ConsulterDepartementType) => state.etatSupprimerDepartement);

export default SliceConsulterDepartement.reducer;