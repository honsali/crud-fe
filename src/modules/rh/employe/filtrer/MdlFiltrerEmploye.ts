import { createSelector, createSlice } from '@reduxjs/toolkit';
import { FormInstance } from 'antd';
import { IListePagineeEmploye, IRequeteEmploye } from 'modele/rh/employe/DomaineEmploye';
import { createEtatError, createEtatInit, createEtatPending, createEtatSuccess, IRequete, IResultat, IRootState } from 'waxant';
import CtrlFiltrerEmploye from './CtrlFiltrerEmploye';

export interface ReqFiltrerEmploye extends IRequete {
    form?: FormInstance;
    pageCourante?: number;
}

export interface ResFiltrerEmploye extends IResultat {
    filtre?: IRequeteEmploye;
    listePagineeEmploye?: IListePagineeEmploye;
}

const initialState = {
    etatChangerPageFiltrerEmploye: createEtatInit(),
    etatFiltrerEmploye: createEtatInit(),
    etatInitialiserFiltrerEmploye: createEtatInit(),
    filtre: {} as IRequeteEmploye,
    listePagineeEmploye: {} as IListePagineeEmploye,
    pageCourante: 0,
};

type FiltrerEmployeType = typeof initialState;

const SliceFiltrerEmploye = createSlice({
    name: 'MdlFiltrerEmploye',
    initialState,
    reducers: {
        resetEtatChangerPageFiltrerEmploye(state) {
            state.etatChangerPageFiltrerEmploye = createEtatInit();
        },
        resetEtatFiltrerEmploye(state) {
            state.etatFiltrerEmploye = createEtatInit();
        },
        resetEtatInitialiserFiltrerEmploye(state) {
            state.etatInitialiserFiltrerEmploye = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlFiltrerEmploye.changerPageFiltrerEmploye.fulfilled, (state, action) => {
                state.listePagineeEmploye = action.payload.listePagineeEmploye;
                state.pageCourante = action.payload.listePagineeEmploye.pagination.pageCourante;
                state.etatChangerPageFiltrerEmploye = createEtatSuccess();
            })
            .addCase(CtrlFiltrerEmploye.changerPageFiltrerEmploye.pending, (state, action) => {
                state.etatChangerPageFiltrerEmploye = createEtatPending();
            })
            .addCase(CtrlFiltrerEmploye.changerPageFiltrerEmploye.rejected, (state, action) => {
                state.etatChangerPageFiltrerEmploye = createEtatError();
            })
            .addCase(CtrlFiltrerEmploye.filtrerEmploye.fulfilled, (state, action) => {
                state.listePagineeEmploye = action.payload.listePagineeEmploye;
                state.filtre = action.payload.filtre;
                state.pageCourante = 0;
                state.etatFiltrerEmploye = createEtatSuccess();
            })
            .addCase(CtrlFiltrerEmploye.filtrerEmploye.pending, (state, action) => {
                state.etatFiltrerEmploye = createEtatPending();
            })
            .addCase(CtrlFiltrerEmploye.filtrerEmploye.rejected, (state, action) => {
                state.etatFiltrerEmploye = createEtatError();
            })
            .addCase(CtrlFiltrerEmploye.initialiserFiltrerEmploye.fulfilled, (state, action) => {
                state.listePagineeEmploye = action.payload.listePagineeEmploye;
                state.pageCourante = 0;
                state.filtre = action.payload.filtre;
                state.etatInitialiserFiltrerEmploye = createEtatSuccess();
            })
            .addCase(CtrlFiltrerEmploye.initialiserFiltrerEmploye.pending, (state, action) => {
                state.etatInitialiserFiltrerEmploye = createEtatPending();
            })
            .addCase(CtrlFiltrerEmploye.initialiserFiltrerEmploye.rejected, (state, action) => {
                state.etatInitialiserFiltrerEmploye = createEtatError();
            });
    },
});

export const MdlFiltrerEmploye = SliceFiltrerEmploye.actions;

const selectMdlFiltrerEmploye = (state: IRootState) => state.mdlFiltrerEmploye;
export const selectEtatFiltrerEmploye = createSelector([selectMdlFiltrerEmploye], (state: FiltrerEmployeType) => state.etatFiltrerEmploye);
export const selectListePagineeEmploye = createSelector([selectMdlFiltrerEmploye], (state: FiltrerEmployeType) => state.listePagineeEmploye);
export const selectEtatChangerPageFiltrerEmploye = createSelector([selectMdlFiltrerEmploye], (state: FiltrerEmployeType) => state.etatChangerPageFiltrerEmploye);
export const selectEtatInitialiserFiltrerEmploye = createSelector([selectMdlFiltrerEmploye], (state: FiltrerEmployeType) => state.etatInitialiserFiltrerEmploye);

export default SliceFiltrerEmploye.reducer;