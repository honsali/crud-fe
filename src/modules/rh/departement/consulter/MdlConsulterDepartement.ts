import { createSlice } from '@reduxjs/toolkit';
import { IDepartement } from 'modele/rh/departement/DomaineDepartement';
import { EtatMdl, IRequete, IResultat, IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlConsulterDepartement from './CtrlConsulterDepartement';

export interface ReqConsulterDepartement extends IRequete {
    idDepartement: string;
}

export interface ResConsulterDepartement extends IResultat {
    departement?: IDepartement;
}

interface ConsulterDepartementType {
    departement?: IDepartement;
    requeteConsultationId?: string;
    etatRecupererDepartementParId: EtatMdl;
    etatSupprimerDepartement: EtatMdl;
}

const initialState: ConsulterDepartementType = {
    etatRecupererDepartementParId: createEtatInit(),
    etatSupprimerDepartement: createEtatInit(),
};

const SliceConsulterDepartement = createSlice({
    name: 'MdlConsulterDepartement',
    initialState,
    reducers: {
        resetEtatSupprimerDepartement(state) {
            state.etatSupprimerDepartement = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlConsulterDepartement.recupererDepartementParId.fulfilled, (state, action) => {
                if (action.meta.requestId !== state.requeteConsultationId) {
                    return;
                }
                state.departement = action.payload.departement;
                state.etatRecupererDepartementParId = createEtatSuccess();
                state.requeteConsultationId = undefined;
            })
            .addCase(CtrlConsulterDepartement.recupererDepartementParId.pending, (state, action) => {
                state.departement = undefined;
                state.etatRecupererDepartementParId = createEtatPending();
                // Une réponse précédente ne doit pas remplacer le département demandé depuis.
                state.requeteConsultationId = action.meta.requestId;
            })
            .addCase(CtrlConsulterDepartement.recupererDepartementParId.rejected, (state, action) => {
                if (action.meta.requestId !== state.requeteConsultationId) {
                    return;
                }
                state.etatRecupererDepartementParId = createEtatError();
                state.requeteConsultationId = undefined;
            })
            .addCase(CtrlConsulterDepartement.supprimerDepartement.fulfilled, (state) => {
                state.etatSupprimerDepartement = createEtatSuccess();
            })
            .addCase(CtrlConsulterDepartement.supprimerDepartement.pending, (state) => {
                state.etatSupprimerDepartement = createEtatPending();
            })
            .addCase(CtrlConsulterDepartement.supprimerDepartement.rejected, (state) => {
                state.etatSupprimerDepartement = createEtatError();
            });
    },
});

export const MdlConsulterDepartement = SliceConsulterDepartement.actions;

const selectMdlConsulterDepartement = (state: IRootState): ConsulterDepartementType => state.mdlConsulterDepartement;
export const selectDepartement = (state: IRootState) => selectMdlConsulterDepartement(state).departement;
export const selectEtatSupprimerDepartement = (state: IRootState) => selectMdlConsulterDepartement(state).etatSupprimerDepartement;

export default SliceConsulterDepartement.reducer;
