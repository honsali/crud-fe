import ServiceEntity from 'modele/modelisation/entity/ServiceEntity';
import ServiceModule from 'modele/modelisation/module/ServiceModule';
import { ActionNavigation } from 'modules/navigation/ActionNavigation';
import { action } from 'waxant';
import { type ReqListerEntity, type ResListerEntity } from './MdlListerEntity';


const listerEntityImpl = async (requete: ReqListerEntity, resultat: ResListerEntity, thunkAPI) => {
    resultat.listeEntity = await ServiceEntity.lister();
};


const listerModuleImpl = async (requete: ReqListerEntity, resultat: ResListerEntity, thunkAPI) => {
    resultat.listeModule = await ServiceModule.lister();
};


const CtrlListerEntity = {
    listerEntity: action<ReqListerEntity, ResListerEntity>(listerEntityImpl, ActionNavigation.UcListerEntity.LISTER_ENTITY),
    listerModule: action<ReqListerEntity, ResListerEntity>(listerModuleImpl, ActionNavigation.UcListerEntity.LISTER_MODULE),
};

export default CtrlListerEntity;