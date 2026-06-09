import { createSelector, createSlice } from '@reduxjs/toolkit';
import { type FormInstance } from 'antd';
import { type IEntity } from 'modele/modelisation/entity/DomaineEntity';
import { type IField } from 'modele/modelisation/field/DomaineField';
import { type IModule } from 'modele/modelisation/module/DomaineModule';
import { type EtatMdl, type IRequete, type IResultat, type IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlListerModule from './CtrlListerModule';

export interface ReqListerModule extends IRequete {
    form?: FormInstance;
    module?: IModule;
    entity?: IEntity;
    field?: IField;
    idEntity?: string;
    idField?: string;
    idModule?: string;
}

export interface ResListerModule extends IResultat {
    entity: IEntity | {};
    idEntity?: string;
    idField?: string;
    idModule?: string;
    listeEntity?: IEntity[];
    listeField?: IField[];
    listeModule?: IModule[];
    module: IModule | {};
}

interface ListerModuleType {
    entity?: IEntity;
    etatCreerEntity: EtatMdl;
    etatCreerField: EtatMdl;
    etatCreerModule: EtatMdl;
    etatListerEntity: EtatMdl;
    etatListerFieldParIdEntity: EtatMdl;
    etatListerModule: EtatMdl;
    etatMajEntity: EtatMdl;
    etatMajField: EtatMdl;
    etatMajModule: EtatMdl;
    etatSupprimerEntity: EtatMdl;
    etatSupprimerField: EtatMdl;
    etatSupprimerModule: EtatMdl;
    field?: IField;
    idEntity?: string;
    idField?: string;
    idModule?: string;
    listeEntity?: IEntity[];
    listeField?: IField[];
    listeModule?: IModule[];
    module?: IModule;
}

const initialState: ListerModuleType = {
    entity: {} as IEntity,
    etatCreerEntity: createEtatInit(),
    etatCreerField: createEtatInit(),
    etatCreerModule: createEtatInit(),
    etatListerEntity: createEtatInit(),
    etatListerFieldParIdEntity: createEtatInit(),
    etatListerModule: createEtatInit(),
    etatMajEntity: createEtatInit(),
    etatMajField: createEtatInit(),
    etatMajModule: createEtatInit(),
    etatSupprimerEntity: createEtatInit(),
    etatSupprimerField: createEtatInit(),
    etatSupprimerModule: createEtatInit(),
    field: {} as IField,
    listeEntity: [] as IEntity[],
    listeField: [] as IField[],
    listeModule: [] as IModule[],
    module: {} as IModule,
};

const SliceListerModule = createSlice({
    name: 'MdlListerModule',
    initialState,
    reducers: {
        resetEtatCreerEntity(state) {
            state.etatCreerEntity = createEtatInit();
        },
        resetEtatCreerField(state) {
            state.etatCreerField = createEtatInit();
        },
        resetEtatCreerModule(state) {
            state.etatCreerModule = createEtatInit();
        },
        resetEtatListerEntity(state) {
            state.etatListerEntity = createEtatInit();
        },
        resetEtatListerFieldParIdEntity(state) {
            state.etatListerFieldParIdEntity = createEtatInit();
        },
        resetEtatListerModule(state) {
            state.etatListerModule = createEtatInit();
        },
        resetEtatMajEntity(state) {
            state.etatMajEntity = createEtatInit();
        },
        resetEtatMajField(state) {
            state.etatMajField = createEtatInit();
        },
        resetEtatMajModule(state) {
            state.etatMajModule = createEtatInit();
        },
        resetEtatSupprimerEntity(state) {
            state.etatSupprimerEntity = createEtatInit();
        },
        resetEtatSupprimerField(state) {
            state.etatSupprimerField = createEtatInit();
        },
        resetEtatSupprimerModule(state) {
            state.etatSupprimerModule = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlListerModule.creerEntity.fulfilled, (state, action) => {
                state.idEntity = action.payload.idEntity;
                state.listeEntity = action.payload.listeEntity;
                state.etatCreerEntity = createEtatSuccess();
            })
            .addCase(CtrlListerModule.creerEntity.pending, (state, action) => {
                state.etatCreerEntity = createEtatPending();
            })
            .addCase(CtrlListerModule.creerEntity.rejected, (state, action) => {
                state.etatCreerEntity = createEtatError();
            })
            .addCase(CtrlListerModule.creerField.fulfilled, (state, action) => {
                state.idField = action.payload.idField;
                state.listeField = action.payload.listeField;
                state.etatCreerField = createEtatSuccess();
            })
            .addCase(CtrlListerModule.creerField.pending, (state, action) => {
                state.etatCreerField = createEtatPending();
            })
            .addCase(CtrlListerModule.creerField.rejected, (state, action) => {
                state.etatCreerField = createEtatError();
            })
            .addCase(CtrlListerModule.creerModule.fulfilled, (state, action) => {
                state.idModule = action.payload.idModule;
                state.listeModule = action.payload.listeModule;
                state.etatCreerModule = createEtatSuccess();
            })
            .addCase(CtrlListerModule.creerModule.pending, (state, action) => {
                state.etatCreerModule = createEtatPending();
            })
            .addCase(CtrlListerModule.creerModule.rejected, (state, action) => {
                state.etatCreerModule = createEtatError();
            })
            .addCase(CtrlListerModule.listerEntity.fulfilled, (state, action) => {
                state.listeEntity = action.payload.listeEntity;
                state.etatListerEntity = createEtatSuccess();
            })
            .addCase(CtrlListerModule.listerEntity.pending, (state, action) => {
                state.etatListerEntity = createEtatPending();
            })
            .addCase(CtrlListerModule.listerEntity.rejected, (state, action) => {
                state.etatListerEntity = createEtatError();
            })
            .addCase(CtrlListerModule.listerFieldParIdEntity.fulfilled, (state, action) => {
                state.listeField = action.payload.listeField;
                state.etatListerFieldParIdEntity = createEtatSuccess();
            })
            .addCase(CtrlListerModule.listerFieldParIdEntity.pending, (state, action) => {
                state.etatListerFieldParIdEntity = createEtatPending();
            })
            .addCase(CtrlListerModule.listerFieldParIdEntity.rejected, (state, action) => {
                state.etatListerFieldParIdEntity = createEtatError();
            })
            .addCase(CtrlListerModule.listerModule.fulfilled, (state, action) => {
                state.listeModule = action.payload.listeModule;
                state.etatListerModule = createEtatSuccess();
            })
            .addCase(CtrlListerModule.listerModule.pending, (state, action) => {
                state.etatListerModule = createEtatPending();
            })
            .addCase(CtrlListerModule.listerModule.rejected, (state, action) => {
                state.etatListerModule = createEtatError();
            })
            .addCase(CtrlListerModule.majEntity.fulfilled, (state, action) => {
                state.listeEntity = action.payload.listeEntity;
                state.etatMajEntity = createEtatSuccess();
            })
            .addCase(CtrlListerModule.majEntity.pending, (state, action) => {
                state.etatMajEntity = createEtatPending();
            })
            .addCase(CtrlListerModule.majEntity.rejected, (state, action) => {
                state.etatMajEntity = createEtatError();
            })
            .addCase(CtrlListerModule.majField.fulfilled, (state, action) => {
                state.listeField = action.payload.listeField;
                state.etatMajField = createEtatSuccess();
            })
            .addCase(CtrlListerModule.majField.pending, (state, action) => {
                state.etatMajField = createEtatPending();
            })
            .addCase(CtrlListerModule.majField.rejected, (state, action) => {
                state.etatMajField = createEtatError();
            })
            .addCase(CtrlListerModule.majModule.fulfilled, (state, action) => {
                state.listeModule = action.payload.listeModule;
                state.etatMajModule = createEtatSuccess();
            })
            .addCase(CtrlListerModule.majModule.pending, (state, action) => {
                state.etatMajModule = createEtatPending();
            })
            .addCase(CtrlListerModule.majModule.rejected, (state, action) => {
                state.etatMajModule = createEtatError();
            })
            .addCase(CtrlListerModule.supprimerEntity.fulfilled, (state, action) => {
                state.listeEntity = action.payload.listeEntity;
                state.etatSupprimerEntity = createEtatSuccess();
            })
            .addCase(CtrlListerModule.supprimerEntity.pending, (state, action) => {
                state.etatSupprimerEntity = createEtatPending();
            })
            .addCase(CtrlListerModule.supprimerEntity.rejected, (state, action) => {
                state.etatSupprimerEntity = createEtatError();
            })
            .addCase(CtrlListerModule.supprimerField.fulfilled, (state, action) => {
                state.etatSupprimerField = createEtatSuccess();
                state.listeField = action.payload.listeField;
            })
            .addCase(CtrlListerModule.supprimerField.pending, (state, action) => {
                state.etatSupprimerField = createEtatPending();
            })
            .addCase(CtrlListerModule.supprimerField.rejected, (state, action) => {
                state.etatSupprimerField = createEtatError();
            })
            .addCase(CtrlListerModule.supprimerModule.fulfilled, (state, action) => {
                state.etatSupprimerModule = createEtatSuccess();
                state.listeModule = action.payload.listeModule;
            })
            .addCase(CtrlListerModule.supprimerModule.pending, (state, action) => {
                state.etatSupprimerModule = createEtatPending();
            })
            .addCase(CtrlListerModule.supprimerModule.rejected, (state, action) => {
                state.etatSupprimerModule = createEtatError();
            });
    },
});

export const MdlListerModule = SliceListerModule.actions;

const selectMdlListerModule = (state: IRootState) => state.mdlListerModule;
export const selectEntity = createSelector([selectMdlListerModule], (state: ListerModuleType) => state.entity);
export const selectEtatListerEntity = createSelector([selectMdlListerModule], (state: ListerModuleType) => state.etatListerEntity);
export const selectListeModule = createSelector([selectMdlListerModule], (state: ListerModuleType) => state.listeModule);
export const selectEtatSupprimerEntity = createSelector([selectMdlListerModule], (state: ListerModuleType) => state.etatSupprimerEntity);
export const selectEtatListerModule = createSelector([selectMdlListerModule], (state: ListerModuleType) => state.etatListerModule);
export const selectEtatSupprimerField = createSelector([selectMdlListerModule], (state: ListerModuleType) => state.etatSupprimerField);
export const selectEtatCreerModule = createSelector([selectMdlListerModule], (state: ListerModuleType) => state.etatCreerModule);
export const selectIdField = createSelector([selectMdlListerModule], (state: ListerModuleType) => state.idField);
export const selectListeEntity = createSelector([selectMdlListerModule], (state: ListerModuleType) => state.listeEntity);
export const selectEtatMajEntity = createSelector([selectMdlListerModule], (state: ListerModuleType) => state.etatMajEntity);
export const selectListeField = createSelector([selectMdlListerModule], (state: ListerModuleType) => state.listeField);
export const selectEtatCreerField = createSelector([selectMdlListerModule], (state: ListerModuleType) => state.etatCreerField);
export const selectField = createSelector([selectMdlListerModule], (state: ListerModuleType) => state.field);
export const selectIdModule = createSelector([selectMdlListerModule], (state: ListerModuleType) => state.idModule);
export const selectEtatMajModule = createSelector([selectMdlListerModule], (state: ListerModuleType) => state.etatMajModule);
export const selectEtatCreerEntity = createSelector([selectMdlListerModule], (state: ListerModuleType) => state.etatCreerEntity);
export const selectEtatMajField = createSelector([selectMdlListerModule], (state: ListerModuleType) => state.etatMajField);
export const selectIdEntity = createSelector([selectMdlListerModule], (state: ListerModuleType) => state.idEntity);
export const selectEtatListerFieldParIdEntity = createSelector([selectMdlListerModule], (state: ListerModuleType) => state.etatListerFieldParIdEntity);
export const selectEtatSupprimerModule = createSelector([selectMdlListerModule], (state: ListerModuleType) => state.etatSupprimerModule);
export const selectModule = createSelector([selectMdlListerModule], (state: ListerModuleType) => state.module);

export default SliceListerModule.reducer;