import { createSelector, createSlice } from '@reduxjs/toolkit';
import { FormInstance } from 'antd';
import { IAccount } from 'modele/admin/account/DomaineAccount';
import { EtatMdl, IRequete, IResultat, IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlConsulterAccount from './CtrlConsulterAccount';

export interface ReqConsulterAccount extends IRequete {
    form?: FormInstance;
    idAccount: string;
}

export interface ResConsulterAccount extends IResultat {
    account?: IAccount;
}

interface ConsulterAccountType {
    account?: IAccount;
    etatRecupererAccountParId: EtatMdl;
    etatReinitialiserMotDePasseAccount: EtatMdl;
}

const initialState: ConsulterAccountType = {
    account: {} as IAccount,
    etatRecupererAccountParId: createEtatInit(),
    etatReinitialiserMotDePasseAccount: createEtatInit(),
};

const SliceConsulterAccount = createSlice({
    name: 'MdlConsulterAccount',
    initialState,
    reducers: {
        resetEtatRecupererAccountParId(state) {
            state.etatRecupererAccountParId = createEtatInit();
        },
        resetEtatReinitialiserMotDePasseAccount(state) {
            state.etatReinitialiserMotDePasseAccount = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlConsulterAccount.recupererAccountParId.fulfilled, (state, action) => {
                state.account = action.payload.account;
                state.etatRecupererAccountParId = createEtatSuccess();
            })
            .addCase(CtrlConsulterAccount.recupererAccountParId.pending, (state) => {
                state.etatRecupererAccountParId = createEtatPending();
            })
            .addCase(CtrlConsulterAccount.recupererAccountParId.rejected, (state) => {
                state.etatRecupererAccountParId = createEtatError();
            })
            .addCase(CtrlConsulterAccount.reinitialiserMotDePasseAccount.fulfilled, (state) => {
                state.etatReinitialiserMotDePasseAccount = createEtatSuccess();
            })
            .addCase(CtrlConsulterAccount.reinitialiserMotDePasseAccount.pending, (state) => {
                state.etatReinitialiserMotDePasseAccount = createEtatPending();
            })
            .addCase(CtrlConsulterAccount.reinitialiserMotDePasseAccount.rejected, (state) => {
                state.etatReinitialiserMotDePasseAccount = createEtatError();
            });
    },
});

export const MdlConsulterAccount = SliceConsulterAccount.actions;

const selectMdlConsulterAccount = (state: IRootState) => state.mdlConsulterAccount;
export const selectAccount = createSelector([selectMdlConsulterAccount], (state: ConsulterAccountType) => state.account);
export const selectEtatRecupererAccountParId = createSelector([selectMdlConsulterAccount], (state: ConsulterAccountType) => state.etatRecupererAccountParId);
export const selectEtatReinitialiserMotDePasseAccount = createSelector([selectMdlConsulterAccount], (state: ConsulterAccountType) => state.etatReinitialiserMotDePasseAccount);

export default SliceConsulterAccount.reducer;
