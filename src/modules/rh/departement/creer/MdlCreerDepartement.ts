import { createSelector, createSlice } from '@reduxjs/toolkit';
import { type FormInstance } from 'antd';
import { type EtatMdl, type IRequete, type IResultat, type IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlCreerDepartement from './CtrlCreerDepartement';

export interface ReqCreerDepartement extends IRequete {
    form?: FormInstance;
}

export interface ResCreerDepartement extends IResultat {
    idDepartement?: string;
}

interface CreerDepartementType {
    etatCreerDepartement: EtatMdl;
    idDepartement?: string;
}

const initialState: CreerDepartementType = {
    etatCreerDepartement: createEtatInit(),
};

const SliceCreerDepartement = createSlice({
    name: 'MdlCreerDepartement',
    initialState,
    reducers: {
        resetEtatCreerDepartement(state) {
            state.etatCreerDepartement = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlCreerDepartement.creerDepartement.fulfilled, (state, action) => {
                state.idDepartement = action.payload.idDepartement;
                state.etatCreerDepartement = createEtatSuccess();
            })
            .addCase(CtrlCreerDepartement.creerDepartement.pending, (state, action) => {
                state.etatCreerDepartement = createEtatPending();
            })
            .addCase(CtrlCreerDepartement.creerDepartement.rejected, (state, action) => {
                state.etatCreerDepartement = createEtatError();
            });
    },
});

export const MdlCreerDepartement = SliceCreerDepartement.actions;

const selectMdlCreerDepartement = (state: IRootState) => state.mdlCreerDepartement;
export const selectEtatCreerDepartement = createSelector([selectMdlCreerDepartement], (state: CreerDepartementType) => state.etatCreerDepartement);
export const selectIdDepartement = createSelector([selectMdlCreerDepartement], (state: CreerDepartementType) => state.idDepartement);

export default SliceCreerDepartement.reducer;