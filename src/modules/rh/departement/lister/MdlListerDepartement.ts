import { createSelector, createSlice } from '@reduxjs/toolkit';
import { type IDepartement } from 'modele/rh/departement/DomaineDepartement';
import { type EtatMdl, type IRequete, type IResultat, type IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlListerDepartement from './CtrlListerDepartement';

export interface ReqListerDepartement extends IRequete {
}

export interface ResListerDepartement extends IResultat {
    listeDepartement?: IDepartement[];
}

interface ListerDepartementType {
    etatListerDepartement: EtatMdl;
    listeDepartement?: IDepartement[];
}

const initialState: ListerDepartementType = {
    etatListerDepartement: createEtatInit(),
    listeDepartement: [] as IDepartement[],
};

const SliceListerDepartement = createSlice({
    name: 'MdlListerDepartement',
    initialState,
    reducers: {
        resetEtatListerDepartement(state) {
            state.etatListerDepartement = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlListerDepartement.listerDepartement.fulfilled, (state, action) => {
                state.listeDepartement = action.payload.listeDepartement;
                state.etatListerDepartement = createEtatSuccess();
            })
            .addCase(CtrlListerDepartement.listerDepartement.pending, (state, action) => {
                state.etatListerDepartement = createEtatPending();
            })
            .addCase(CtrlListerDepartement.listerDepartement.rejected, (state, action) => {
                state.etatListerDepartement = createEtatError();
            });
    },
});

export const MdlListerDepartement = SliceListerDepartement.actions;

const selectMdlListerDepartement = (state: IRootState) => state.mdlListerDepartement;
export const selectListeDepartement = createSelector([selectMdlListerDepartement], (state: ListerDepartementType) => state.listeDepartement);
export const selectEtatListerDepartement = createSelector([selectMdlListerDepartement], (state: ListerDepartementType) => state.etatListerDepartement);

export default SliceListerDepartement.reducer;