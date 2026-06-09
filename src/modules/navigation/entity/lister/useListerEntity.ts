import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlListerEntity from './CtrlListerEntity';
import { MdlListerEntity, type ReqListerEntity, type ResListerEntity, selectEtatListerEntity, selectEtatListerModule, selectListeEntity, selectListeModule } from './MdlListerEntity';

const useListerEntity = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatListerEntity = useSelector(selectEtatListerEntity);
    const listeModule = useSelector(selectListeModule);
    const etatListerModule = useSelector(selectEtatListerModule);
    const listeEntity = useSelector(selectListeEntity);

    const createAction = (action: AsyncThunk<ResListerEntity, ReqListerEntity, AsyncThunkConfig>) => (req?: ReqListerEntity) => dispatch(action({ ...req, ...params } as ReqListerEntity));

    return {
        // Actions
        listerEntity: createAction(CtrlListerEntity.listerEntity),
        listerModule: createAction(CtrlListerEntity.listerModule),
        resetEtatListerEntity: () => dispatch(MdlListerEntity.resetEtatListerEntity()),
        resetEtatListerModule: () => dispatch(MdlListerEntity.resetEtatListerModule()),

        // State
        etatListerEntity,
        listeModule,
        etatListerModule,
        listeEntity,
    };
};

export default useListerEntity;