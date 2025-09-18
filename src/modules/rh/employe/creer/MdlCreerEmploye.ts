import { createSelector, createSlice } from '@reduxjs/toolkit';
import { FormInstance } from 'antd';
import { createEtatError, createEtatInit, createEtatPending, createEtatSuccess, IRequete, IResultat, IRootState } from 'waxant';
import CtrlCreerEmploye from './CtrlCreerEmploye';

export interface ReqCreerEmploye extends IRequete {
    form?: FormInstance;
}

export interface ResCreerEmploye extends IResultat {
    idEmploye?: string;
}

const initialState = {
    etatCreerEmploye: createEtatInit(),
    idEmploye: null,
};

type CreerEmployeType = typeof initialState;

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