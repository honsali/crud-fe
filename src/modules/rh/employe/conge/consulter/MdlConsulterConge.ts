import { createSelector, createSlice } from '@reduxjs/toolkit';
import { IConge } from 'modele/rh/conge/DomaineConge';
import { EtatMdl, IRequete, IResultat, IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlConsulterConge from './CtrlConsulterConge';

export interface ReqConsulterConge extends IRequete {
    idConge: string;
}

export interface ResConsulterConge extends IResultat {
    conge?: IConge;
}

interface ConsulterCongeType {
    conge?: IConge;
    etatRecupererCongeParId: EtatMdl;
    etatSupprimerConge: EtatMdl;
}

const initialState: ConsulterCongeType = {
    conge: {} as IConge,
    etatRecupererCongeParId: createEtatInit(),
    etatSupprimerConge: createEtatInit(),
};

const SliceConsulterConge = createSlice({
    name: 'MdlConsulterConge',
    initialState,
    reducers: {
        resetEtatRecupererCongeParId(state) {
            state.etatRecupererCongeParId = createEtatInit();
        },
        resetEtatSupprimerConge(state) {
            state.etatSupprimerConge = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlConsulterConge.recupererCongeParId.fulfilled, (state, action) => {
                state.conge = action.payload.conge;
                state.etatRecupererCongeParId = createEtatSuccess();
            })
            .addCase(CtrlConsulterConge.recupererCongeParId.pending, (state) => {
                state.etatRecupererCongeParId = createEtatPending();
            })
            .addCase(CtrlConsulterConge.recupererCongeParId.rejected, (state) => {
                state.etatRecupererCongeParId = createEtatError();
            })
            .addCase(CtrlConsulterConge.supprimerConge.fulfilled, (state) => {
                state.etatSupprimerConge = createEtatSuccess();
            })
            .addCase(CtrlConsulterConge.supprimerConge.pending, (state) => {
                state.etatSupprimerConge = createEtatPending();
            })
            .addCase(CtrlConsulterConge.supprimerConge.rejected, (state) => {
                state.etatSupprimerConge = createEtatError();
            });
    },
});

export const MdlConsulterConge = SliceConsulterConge.actions;

const selectMdlConsulterConge = (state: IRootState) => state.mdlConsulterConge;
export const selectConge = createSelector([selectMdlConsulterConge], (state: ConsulterCongeType) => state.conge);
export const selectEtatRecupererCongeParId = createSelector([selectMdlConsulterConge], (state: ConsulterCongeType) => state.etatRecupererCongeParId);
export const selectEtatSupprimerConge = createSelector([selectMdlConsulterConge], (state: ConsulterCongeType) => state.etatSupprimerConge);

export default SliceConsulterConge.reducer;
