import { createSelector, createSlice } from '@reduxjs/toolkit';
import { ICreateAccountRequest } from 'modele/admin/account/DomaineAccount';
import { EtatMdl, IRequete, IResultat, IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlCreerAccount from './CtrlCreerAccount';

export interface ReqCreerAccount extends IRequete {
    request: ICreateAccountRequest;
}

export interface ResCreerAccount extends IResultat {
    idAccount?: string;
}

interface CreerAccountType {
    etatCreerAccount: EtatMdl;
    idAccount?: string;
}

const initialState: CreerAccountType = {
    etatCreerAccount: createEtatInit(),
};

const SliceCreerAccount = createSlice({
    name: 'MdlCreerAccount',
    initialState,
    reducers: {
        resetEtatCreerAccount(state) {
            state.etatCreerAccount = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlCreerAccount.creerAccount.fulfilled, (state, action) => {
                state.idAccount = action.payload.idAccount;
                state.etatCreerAccount = createEtatSuccess();
            })
            .addCase(CtrlCreerAccount.creerAccount.pending, (state) => {
                state.etatCreerAccount = createEtatPending();
            })
            .addCase(CtrlCreerAccount.creerAccount.rejected, (state) => {
                state.etatCreerAccount = createEtatError();
            });
    },
});

export const MdlCreerAccount = SliceCreerAccount.actions;

const selectMdlCreerAccount = (state: IRootState) => state.mdlCreerAccount;
export const selectEtatCreerAccount = createSelector([selectMdlCreerAccount], (state: CreerAccountType) => state.etatCreerAccount);
export const selectIdAccount = createSelector([selectMdlCreerAccount], (state: CreerAccountType) => state.idAccount);

export default SliceCreerAccount.reducer;
