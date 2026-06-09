import { createSelector, createSlice } from '@reduxjs/toolkit';
import { type FormInstance } from 'antd';
import { type IMenu } from 'modele/navigation/menu/DomaineMenu';
import { type EtatMdl, type IRequete, type IResultat, type IRootState, createEtatError, createEtatInit, createEtatPending, createEtatSuccess } from 'waxant';
import CtrlListerMenu from './CtrlListerMenu';

export interface ReqListerMenu extends IRequete {
    form?: FormInstance;
    idMenu?: string;
    menu?: IMenu;
}

export interface ResListerMenu extends IResultat {
    idMenu?: string;
    listeMenu?: IMenu[];
    menu: IMenu | {};
}

interface ListerMenuType {
    etatCreerMenu: EtatMdl;
    etatListerMenu: EtatMdl;
    etatMajMenu: EtatMdl;
    etatSupprimerMenu: EtatMdl;
    idMenu?: string;
    listeMenu?: IMenu[];
    menu?: IMenu;
}

const initialState: ListerMenuType = {
    etatCreerMenu: createEtatInit(),
    etatListerMenu: createEtatInit(),
    etatMajMenu: createEtatInit(),
    etatSupprimerMenu: createEtatInit(),
    listeMenu: [] as IMenu[],
    menu: {} as IMenu,
};

const SliceListerMenu = createSlice({
    name: 'MdlListerMenu',
    initialState,
    reducers: {
        resetEtatCreerMenu(state) {
            state.etatCreerMenu = createEtatInit();
        },
        resetEtatListerMenu(state) {
            state.etatListerMenu = createEtatInit();
        },
        resetEtatMajMenu(state) {
            state.etatMajMenu = createEtatInit();
        },
        resetEtatSupprimerMenu(state) {
            state.etatSupprimerMenu = createEtatInit();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CtrlListerMenu.creerMenu.fulfilled, (state, action) => {
                state.idMenu = action.payload.idMenu;
                state.listeMenu = action.payload.listeMenu;
                state.etatCreerMenu = createEtatSuccess();
            })
            .addCase(CtrlListerMenu.creerMenu.pending, (state, action) => {
                state.etatCreerMenu = createEtatPending();
            })
            .addCase(CtrlListerMenu.creerMenu.rejected, (state, action) => {
                state.etatCreerMenu = createEtatError();
            })
            .addCase(CtrlListerMenu.listerMenu.fulfilled, (state, action) => {
                state.listeMenu = action.payload.listeMenu;
                state.etatListerMenu = createEtatSuccess();
            })
            .addCase(CtrlListerMenu.listerMenu.pending, (state, action) => {
                state.etatListerMenu = createEtatPending();
            })
            .addCase(CtrlListerMenu.listerMenu.rejected, (state, action) => {
                state.etatListerMenu = createEtatError();
            })
            .addCase(CtrlListerMenu.majMenu.fulfilled, (state, action) => {
                state.listeMenu = action.payload.listeMenu;
                state.etatMajMenu = createEtatSuccess();
            })
            .addCase(CtrlListerMenu.majMenu.pending, (state, action) => {
                state.etatMajMenu = createEtatPending();
            })
            .addCase(CtrlListerMenu.majMenu.rejected, (state, action) => {
                state.etatMajMenu = createEtatError();
            })
            .addCase(CtrlListerMenu.supprimerMenu.fulfilled, (state, action) => {
                state.listeMenu = action.payload.listeMenu;
                state.etatSupprimerMenu = createEtatSuccess();
            })
            .addCase(CtrlListerMenu.supprimerMenu.pending, (state, action) => {
                state.etatSupprimerMenu = createEtatPending();
            })
            .addCase(CtrlListerMenu.supprimerMenu.rejected, (state, action) => {
                state.etatSupprimerMenu = createEtatError();
            });
    },
});

export const MdlListerMenu = SliceListerMenu.actions;

const selectMdlListerMenu = (state: IRootState) => state.mdlListerMenu;
export const selectEtatMajMenu = createSelector([selectMdlListerMenu], (state: ListerMenuType) => state.etatMajMenu);
export const selectEtatSupprimerMenu = createSelector([selectMdlListerMenu], (state: ListerMenuType) => state.etatSupprimerMenu);
export const selectEtatCreerMenu = createSelector([selectMdlListerMenu], (state: ListerMenuType) => state.etatCreerMenu);
export const selectMenu = createSelector([selectMdlListerMenu], (state: ListerMenuType) => state.menu);
export const selectListeMenu = createSelector([selectMdlListerMenu], (state: ListerMenuType) => state.listeMenu);
export const selectIdMenu = createSelector([selectMdlListerMenu], (state: ListerMenuType) => state.idMenu);
export const selectEtatListerMenu = createSelector([selectMdlListerMenu], (state: ListerMenuType) => state.etatListerMenu);

export default SliceListerMenu.reducer;