import { createSelector, createSlice } from '@reduxjs/toolkit';
import { IDepartement } from 'modele/rh/departement/DomaineDepartement';
import { createEtatError, createEtatInit, createEtatPending, createEtatSuccess, IRequete, IResultat, IRootState } from 'waxant';
import CtrlConsulterDepartement from './CtrlConsulterDepartement';

export interface ReqConsulterDepartement extends IRequete {
    idDepartement?: string;
}

export interface ResConsulterDepartement extends IResultat {
    departement?: IDepartement;
}

const initialState = {
    departement: {} as IDepartement,
    etatRecupererDepartementParId: createEtatInit(),
};

type ConsulterDepartementType = typeof initialState;

const SliceConsulterDepartement = createSlice({
    name: 'MdlConsulterDepartement',
    initialState,
    reducers: {
        resetEtatRecupererDepartementParId(state) {
            state.etatRecupererDepartementParId = createEtatInit();
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
            });
    },
});

export const MdlConsulterDepartement = SliceConsulterDepartement.actions;

const selectMdlConsulterDepartement = (state: IRootState) => state.mdlConsulterDepartement;
export const selectEtatRecupererDepartementParId = createSelector([selectMdlConsulterDepartement], (state: ConsulterDepartementType) => state.etatRecupererDepartementParId);
export const selectDepartement = createSelector([selectMdlConsulterDepartement], (state: ConsulterDepartementType) => state.departement);

export default SliceConsulterDepartement.reducer;