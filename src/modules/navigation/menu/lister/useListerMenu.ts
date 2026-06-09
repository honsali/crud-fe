import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlListerMenu from './CtrlListerMenu';
import { MdlListerMenu, type ReqListerMenu, type ResListerMenu, selectEtatCreerMenu, selectEtatListerMenu, selectEtatMajMenu, selectEtatSupprimerMenu, selectIdMenu, selectListeMenu, selectMenu } from './MdlListerMenu';

const useListerMenu = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatMajMenu = useSelector(selectEtatMajMenu);
    const etatSupprimerMenu = useSelector(selectEtatSupprimerMenu);
    const etatCreerMenu = useSelector(selectEtatCreerMenu);
    const menu = useSelector(selectMenu);
    const listeMenu = useSelector(selectListeMenu);
    const idMenu = useSelector(selectIdMenu);
    const etatListerMenu = useSelector(selectEtatListerMenu);

    const createAction = (action: AsyncThunk<ResListerMenu, ReqListerMenu, AsyncThunkConfig>) => (req?: ReqListerMenu) => dispatch(action({ ...req, ...params } as ReqListerMenu));

    return {
        // Actions
        creerMenu: createAction(CtrlListerMenu.creerMenu),
        listerMenu: createAction(CtrlListerMenu.listerMenu),
        majMenu: createAction(CtrlListerMenu.majMenu),
        supprimerMenu: createAction(CtrlListerMenu.supprimerMenu),
        resetEtatCreerMenu: () => dispatch(MdlListerMenu.resetEtatCreerMenu()),
        resetEtatListerMenu: () => dispatch(MdlListerMenu.resetEtatListerMenu()),
        resetEtatMajMenu: () => dispatch(MdlListerMenu.resetEtatMajMenu()),
        resetEtatSupprimerMenu: () => dispatch(MdlListerMenu.resetEtatSupprimerMenu()),

        // State
        etatMajMenu,
        etatSupprimerMenu,
        etatCreerMenu,
        menu,
        listeMenu,
        idMenu,
        etatListerMenu,
    };
};

export default useListerMenu;