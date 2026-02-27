import { createSelector, createSlice } from '@reduxjs/toolkit';
import { type IConge } from 'modele/rh/conge/DomaineConge';
import { type IEmploye } from 'modele/rh/employe/DomaineEmploye';
import { type EtatMdl, type IRequete, type IResultat, type IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlConsulterEmploye from './CtrlConsulterEmploye';

export interface ReqConsulterEmploye extends IRequete {
    idEmploye?: string;
}

export interface ResConsulterEmploye extends IResultat {
    employe: IEmploye | {};
    listeConge?: IConge[];
}

interface ConsulterEmployeType {
    employe?: IEmploye;
    etatListerCongeParIdEmploye: EtatMdl;
    etatRecupererEmployeParId: EtatMdl;
    etatSupprimerEmploye: EtatMdl;
    listeConge?: IConge[];
}

const initialState: ConsulterEmployeType = {
    employe: {} as IEmploye,
    etatListerCongeParIdEmploye: createEtatInit(),
    etatRecupererEmployeParId: createEtatInit(),
    etatSupprimerEmploye: createEtatInit(),
    listeConge: [] as IConge[],
};

const SliceConsulterEmploye = createSlice({
    name: 'MdlConsulterEmploye',
    initialState,
    reducers: {
        resetEtatListerCongeParIdEmploye(state) {
            state.etatListerCongeParIdEmploye = createEtatInit();
        },
        resetEtatRecupererEmployeParId(state) {
            state.etatRecupererEmployeParId = createEtatInit();
        },
        resetEtatSupprimerEmploye(state) {
            state.etatSupprimerEmploye = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlConsulterEmploye.listerCongeParIdEmploye.fulfilled, (state, action) => {
                state.listeConge = action.payload.listeConge;
                state.etatListerCongeParIdEmploye = createEtatSuccess();
            })
            .addCase(CtrlConsulterEmploye.listerCongeParIdEmploye.pending, (state, action) => {
                state.etatListerCongeParIdEmploye = createEtatPending();
            })
            .addCase(CtrlConsulterEmploye.listerCongeParIdEmploye.rejected, (state, action) => {
                state.etatListerCongeParIdEmploye = createEtatError();
            })
            .addCase(CtrlConsulterEmploye.recupererEmployeParId.fulfilled, (state, action) => {
                state.employe = action.payload.employe;
                state.etatRecupererEmployeParId = createEtatSuccess();
            })
            .addCase(CtrlConsulterEmploye.recupererEmployeParId.pending, (state, action) => {
                state.etatRecupererEmployeParId = createEtatPending();
            })
            .addCase(CtrlConsulterEmploye.recupererEmployeParId.rejected, (state, action) => {
                state.etatRecupererEmployeParId = createEtatError();
            })
            .addCase(CtrlConsulterEmploye.supprimerEmploye.fulfilled, (state, action) => {
                state.etatSupprimerEmploye = createEtatSuccess();
            })
            .addCase(CtrlConsulterEmploye.supprimerEmploye.pending, (state, action) => {
                state.etatSupprimerEmploye = createEtatPending();
            })
            .addCase(CtrlConsulterEmploye.supprimerEmploye.rejected, (state, action) => {
                state.etatSupprimerEmploye = createEtatError();
            });
    },
});

export const MdlConsulterEmploye = SliceConsulterEmploye.actions;

const selectMdlConsulterEmploye = (state: IRootState) => state.mdlConsulterEmploye;
export const selectEtatRecupererEmployeParId = createSelector([selectMdlConsulterEmploye], (state: ConsulterEmployeType) => state.etatRecupererEmployeParId);
export const selectEtatSupprimerEmploye = createSelector([selectMdlConsulterEmploye], (state: ConsulterEmployeType) => state.etatSupprimerEmploye);
export const selectEtatListerCongeParIdEmploye = createSelector([selectMdlConsulterEmploye], (state: ConsulterEmployeType) => state.etatListerCongeParIdEmploye);
export const selectEmploye = createSelector([selectMdlConsulterEmploye], (state: ConsulterEmployeType) => state.employe);
export const selectListeConge = createSelector([selectMdlConsulterEmploye], (state: ConsulterEmployeType) => state.listeConge);

export default SliceConsulterEmploye.reducer;