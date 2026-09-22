import { createSlice } from '@reduxjs/toolkit';
import { IDepartement } from 'modele/rh/departement/DomaineDepartement';
import { EtatMdl, IRequete, IResultat, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import { recupererDepartementParId } from './useCtrlConsulterDepartement';

export interface ReqConsulterDepartement extends IRequete {
    idDepartement: string;
}

export interface ResConsulterDepartement extends IResultat {
    departement?: IDepartement;
}

export interface ConsulterDepartementType {
    departement?: IDepartement;
    requeteConsultationId?: string;
    etatRecupererDepartementParId: EtatMdl;
}

const initialState: ConsulterDepartementType = {
    etatRecupererDepartementParId: createEtatInit(),
};

const SliceConsulterDepartement = createSlice({
    name: 'MdlConsulterDepartement',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(recupererDepartementParId.fulfilled, (state, action) => {
                if (action.meta.requestId !== state.requeteConsultationId) {
                    return;
                }
                state.departement = action.payload.departement;
                state.etatRecupererDepartementParId = createEtatSuccess();
                state.requeteConsultationId = undefined;
            })
            .addCase(recupererDepartementParId.pending, (state, action) => {
                state.departement = undefined;
                state.etatRecupererDepartementParId = createEtatPending();
                // Une réponse précédente ne doit pas remplacer le département demandé depuis.
                state.requeteConsultationId = action.meta.requestId;
            })
            .addCase(recupererDepartementParId.rejected, (state, action) => {
                if (action.meta.requestId !== state.requeteConsultationId) {
                    return;
                }
                state.etatRecupererDepartementParId = createEtatError();
                state.requeteConsultationId = undefined;
            });
    },
});

export default SliceConsulterDepartement.reducer;
