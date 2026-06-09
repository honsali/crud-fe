import { createSelector, createSlice } from '@reduxjs/toolkit';
import { type IEntity } from 'modele/modelisation/entity/DomaineEntity';
import { type IModule } from 'modele/modelisation/module/DomaineModule';
import { type EtatMdl, type IRequete, type IResultat, type IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlListerEntity from './CtrlListerEntity';

export interface ReqListerEntity extends IRequete {
}

export interface ResListerEntity extends IResultat {
    listeEntity?: IEntity[];
    listeModule?: IModule[];
}

interface ListerEntityType {
    etatListerEntity: EtatMdl;
    etatListerModule: EtatMdl;
    listeEntity?: IEntity[];
    listeModule?: IModule[];
}

const initialState: ListerEntityType = {
    etatListerEntity: createEtatInit(),
    etatListerModule: createEtatInit(),
    listeEntity: [] as IEntity[],
    listeModule: [] as IModule[],
};

const SliceListerEntity = createSlice({
    name: 'MdlListerEntity',
    initialState,
    reducers: {
        resetEtatListerEntity(state) {
            state.etatListerEntity = createEtatInit();
        },
        resetEtatListerModule(state) {
            state.etatListerModule = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlListerEntity.listerEntity.fulfilled, (state, action) => {
                state.listeEntity = action.payload.listeEntity;
                state.etatListerEntity = createEtatSuccess();
            })
            .addCase(CtrlListerEntity.listerEntity.pending, (state, action) => {
                state.etatListerEntity = createEtatPending();
            })
            .addCase(CtrlListerEntity.listerEntity.rejected, (state, action) => {
                state.etatListerEntity = createEtatError();
            })
            .addCase(CtrlListerEntity.listerModule.fulfilled, (state, action) => {
                state.listeModule = action.payload.listeModule;
                state.etatListerModule = createEtatSuccess();
            })
            .addCase(CtrlListerEntity.listerModule.pending, (state, action) => {
                state.etatListerModule = createEtatPending();
            })
            .addCase(CtrlListerEntity.listerModule.rejected, (state, action) => {
                state.etatListerModule = createEtatError();
            });
    },
});

export const MdlListerEntity = SliceListerEntity.actions;

const selectMdlListerEntity = (state: IRootState) => state.mdlListerEntity;
export const selectListeEntity = createSelector([selectMdlListerEntity], (state: ListerEntityType) => state.listeEntity);
export const selectEtatListerEntity = createSelector([selectMdlListerEntity], (state: ListerEntityType) => state.etatListerEntity);
export const selectListeModule = createSelector([selectMdlListerEntity], (state: ListerEntityType) => state.listeModule);
export const selectEtatListerModule = createSelector([selectMdlListerEntity], (state: ListerEntityType) => state.etatListerEntity);

export default SliceListerEntity.reducer;