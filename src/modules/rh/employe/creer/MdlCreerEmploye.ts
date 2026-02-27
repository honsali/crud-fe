import { createSelector, createSlice } from '@reduxjs/toolkit';
import { type FormInstance } from 'antd';
import { type EtatMdl, type IRequete, type IResultat, type IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlCreerEmploye from './CtrlCreerEmploye';

export interface ReqCreerEmploye extends IRequete {
    form?: FormInstance;
}

export interface ResCreerEmploye extends IResultat {
    idEmploye?: string;
}

interface CreerEmployeType {
    etatCreerEmploye: EtatMdl;
    idEmploye?: string;
}

const initialState: CreerEmployeType = {
    etatCreerEmploye: createEtatInit(),
};

const SliceCreerEmploye = createSlice({
    name: 'MdlCreerEmploye',
    initialState,
    reducers: {
        resetEtatCreerEmploye(state) {
            state.etatCreerEmploye = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlCreerEmploye.creerEmploye.fulfilled, (state, action) => {
                state.idEmploye = action.payload.idEmploye;
                state.etatCreerEmploye = createEtatSuccess();
            })
            .addCase(CtrlCreerEmploye.creerEmploye.pending, (state, action) => {
                state.etatCreerEmploye = createEtatPending();
            })
            .addCase(CtrlCreerEmploye.creerEmploye.rejected, (state, action) => {
                state.etatCreerEmploye = createEtatError();
            });
    },
});

export const MdlCreerEmploye = SliceCreerEmploye.actions;

const selectMdlCreerEmploye = (state: IRootState) => state.mdlCreerEmploye;
export const selectEtatCreerEmploye = createSelector([selectMdlCreerEmploye], (state: CreerEmployeType) => state.etatCreerEmploye);
export const selectIdEmploye = createSelector([selectMdlCreerEmploye], (state: CreerEmployeType) => state.idEmploye);

export default SliceCreerEmploye.reducer;