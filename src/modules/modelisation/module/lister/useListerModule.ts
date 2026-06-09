import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlListerModule from './CtrlListerModule';
import { MdlListerModule, type ReqListerModule, type ResListerModule, selectEntity, selectEtatCreerEntity, selectEtatCreerField, selectEtatCreerModule, selectEtatListerEntity, selectEtatListerFieldParIdEntity, selectEtatListerModule, selectEtatMajEntity, selectEtatMajField, selectEtatMajModule, selectEtatSupprimerEntity, selectEtatSupprimerField, selectEtatSupprimerModule, selectField, selectIdEntity, selectIdField, selectIdModule, selectListeEntity, selectListeField, selectListeModule, selectModule } from './MdlListerModule';

const useListerModule = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const entity = useSelector(selectEntity);
    const etatListerEntity = useSelector(selectEtatListerEntity);
    const listeModule = useSelector(selectListeModule);
    const etatSupprimerEntity = useSelector(selectEtatSupprimerEntity);
    const etatListerModule = useSelector(selectEtatListerModule);
    const etatSupprimerField = useSelector(selectEtatSupprimerField);
    const etatCreerModule = useSelector(selectEtatCreerModule);
    const idField = useSelector(selectIdField);
    const listeEntity = useSelector(selectListeEntity);
    const etatMajEntity = useSelector(selectEtatMajEntity);
    const listeField = useSelector(selectListeField);
    const etatCreerField = useSelector(selectEtatCreerField);
    const field = useSelector(selectField);
    const idModule = useSelector(selectIdModule);
    const etatMajModule = useSelector(selectEtatMajModule);
    const etatCreerEntity = useSelector(selectEtatCreerEntity);
    const etatMajField = useSelector(selectEtatMajField);
    const idEntity = useSelector(selectIdEntity);
    const etatListerFieldParIdEntity = useSelector(selectEtatListerFieldParIdEntity);
    const etatSupprimerModule = useSelector(selectEtatSupprimerModule);
    const module = useSelector(selectModule);

    const createAction = (action: AsyncThunk<ResListerModule, ReqListerModule, AsyncThunkConfig>) => (req?: ReqListerModule) => dispatch(action({ ...req, ...params } as ReqListerModule));

    return {
        // Actions
        creerEntity: createAction(CtrlListerModule.creerEntity),
        creerField: createAction(CtrlListerModule.creerField),
        creerModule: createAction(CtrlListerModule.creerModule),
        listerEntity: createAction(CtrlListerModule.listerEntity),
        listerFieldParIdEntity: createAction(CtrlListerModule.listerFieldParIdEntity),
        listerModule: createAction(CtrlListerModule.listerModule),
        majEntity: createAction(CtrlListerModule.majEntity),
        majField: createAction(CtrlListerModule.majField),
        majModule: createAction(CtrlListerModule.majModule),
        supprimerEntity: createAction(CtrlListerModule.supprimerEntity),
        supprimerField: createAction(CtrlListerModule.supprimerField),
        supprimerModule: createAction(CtrlListerModule.supprimerModule),
        resetEtatCreerEntity: () => dispatch(MdlListerModule.resetEtatCreerEntity()),
        resetEtatCreerField: () => dispatch(MdlListerModule.resetEtatCreerField()),
        resetEtatCreerModule: () => dispatch(MdlListerModule.resetEtatCreerModule()),
        resetEtatListerEntity: () => dispatch(MdlListerModule.resetEtatListerEntity()),
        resetEtatListerFieldParIdEntity: () => dispatch(MdlListerModule.resetEtatListerFieldParIdEntity()),
        resetEtatListerModule: () => dispatch(MdlListerModule.resetEtatListerModule()),
        resetEtatMajEntity: () => dispatch(MdlListerModule.resetEtatMajEntity()),
        resetEtatMajField: () => dispatch(MdlListerModule.resetEtatMajField()),
        resetEtatMajModule: () => dispatch(MdlListerModule.resetEtatMajModule()),
        resetEtatSupprimerEntity: () => dispatch(MdlListerModule.resetEtatSupprimerEntity()),
        resetEtatSupprimerField: () => dispatch(MdlListerModule.resetEtatSupprimerField()),
        resetEtatSupprimerModule: () => dispatch(MdlListerModule.resetEtatSupprimerModule()),

        // State
        entity,
        etatListerEntity,
        listeModule,
        etatSupprimerEntity,
        etatListerModule,
        etatSupprimerField,
        etatCreerModule,
        idField,
        listeEntity,
        etatMajEntity,
        listeField,
        etatCreerField,
        field,
        idModule,
        etatMajModule,
        etatCreerEntity,
        etatMajField,
        idEntity,
        etatListerFieldParIdEntity,
        etatSupprimerModule,
        module,
    };
};

export default useListerModule;