import { createSelector, createSlice } from '@reduxjs/toolkit';
import { IAccount } from 'modele/admin/account/DomaineAccount';
import { EtatMdl, IRequete, IResultat, IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlListerAccount from './CtrlListerAccount';

export interface ReqListerAccount extends IRequete {
}

export interface ResListerAccount extends IResultat {
    listeAccount?: IAccount[];
}

interface ListerAccountType {
    etatListerAccount: EtatMdl;
    listeAccount?: IAccount[];
}

const initialState: ListerAccountType = {
    etatListerAccount: createEtatInit(),
    listeAccount: [] as IAccount[],
};

const SliceListerAccount = createSlice({
    name: 'MdlListerAccount',
    initialState,
    reducers: {
        resetEtatListerAccount(state) {
            state.etatListerAccount = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlListerAccount.listerAccount.fulfilled, (state, action) => {
                state.listeAccount = action.payload.listeAccount;
                state.etatListerAccount = createEtatSuccess();
            })
            .addCase(CtrlListerAccount.listerAccount.pending, (state) => {
                state.etatListerAccount = createEtatPending();
            })
            .addCase(CtrlListerAccount.listerAccount.rejected, (state) => {
                state.etatListerAccount = createEtatError();
            });
    },
});

export const MdlListerAccount = SliceListerAccount.actions;

const selectMdlListerAccount = (state: IRootState) => state.mdlListerAccount;
export const selectEtatListerAccount = createSelector([selectMdlListerAccount], (state: ListerAccountType) => state.etatListerAccount);
export const selectListeAccount = createSelector([selectMdlListerAccount], (state: ListerAccountType) => state.listeAccount);

export default SliceListerAccount.reducer;
