import { createSelector, createSlice } from '@reduxjs/toolkit';
import { FormInstance } from 'antd';
import { IAccount } from 'modele/admin/account/DomaineAccount';
import { EtatMdl, IRequete, IResultat, IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlModifierAccount from './CtrlModifierAccount';

export interface ReqModifierAccount extends IRequete {
    form?: FormInstance;
    idAccount: string;
}

export interface ResModifierAccount extends IResultat {
    account?: IAccount;
}

interface ModifierAccountType {
    account?: IAccount;
    etatInitModificationAccount: EtatMdl;
    etatMajAccount: EtatMdl;
}

const initialState: ModifierAccountType = {
    account: {} as IAccount,
    etatInitModificationAccount: createEtatInit(),
    etatMajAccount: createEtatInit(),
};

const SliceModifierAccount = createSlice({
    name: 'MdlModifierAccount',
    initialState,
    reducers: {
        resetEtatInitModificationAccount(state) {
            state.etatInitModificationAccount = createEtatInit();
        },
        resetEtatMajAccount(state) {
            state.etatMajAccount = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlModifierAccount.initModificationAccount.fulfilled, (state, action) => {
                state.account = action.payload.account;
                state.etatInitModificationAccount = createEtatSuccess();
            })
            .addCase(CtrlModifierAccount.initModificationAccount.pending, (state) => {
                state.etatInitModificationAccount = createEtatPending();
            })
            .addCase(CtrlModifierAccount.initModificationAccount.rejected, (state) => {
                state.etatInitModificationAccount = createEtatError();
            })
            .addCase(CtrlModifierAccount.majAccount.fulfilled, (state) => {
                state.etatMajAccount = createEtatSuccess();
            })
            .addCase(CtrlModifierAccount.majAccount.pending, (state) => {
                state.etatMajAccount = createEtatPending();
            })
            .addCase(CtrlModifierAccount.majAccount.rejected, (state) => {
                state.etatMajAccount = createEtatError();
            });
    },
});

export const MdlModifierAccount = SliceModifierAccount.actions;

const selectMdlModifierAccount = (state: IRootState) => state.mdlModifierAccount;
export const selectAccount = createSelector([selectMdlModifierAccount], (state: ModifierAccountType) => state.account);
export const selectEtatInitModificationAccount = createSelector([selectMdlModifierAccount], (state: ModifierAccountType) => state.etatInitModificationAccount);
export const selectEtatMajAccount = createSelector([selectMdlModifierAccount], (state: ModifierAccountType) => state.etatMajAccount);

export default SliceModifierAccount.reducer;
