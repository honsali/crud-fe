import ServiceEntity from 'modele/modelisation/entity/ServiceEntity';
import ServiceField from 'modele/modelisation/field/ServiceField';
import ServiceModule from 'modele/modelisation/module/ServiceModule';
import { action, util } from 'waxant';
import { ActionModule } from '../ActionModule';
import { type ReqListerModule, type ResListerModule } from './MdlListerModule';

const creerEntityImpl = async (requete: ReqListerModule, resultat: ResListerModule, thunkAPI) => {
    const { id } = await ServiceEntity.creer(requete.entity);
    resultat.idEntity = id;
    await listerEntityImpl(requete, resultat, thunkAPI);
};

const creerFieldImpl = async (requete: ReqListerModule, resultat: ResListerModule, thunkAPI) => {
    const { id } = await ServiceField.creer(requete.field.entity.id, requete.field);
    resultat.idField = id;
    await listerFieldParIdEntityImpl(requete, resultat, thunkAPI);
};

const creerModuleImpl = async (requete: ReqListerModule, resultat: ResListerModule, thunkAPI) => {
    const { id } = await ServiceModule.creer(requete.module.module.id, requete.module);
    resultat.idModule = id;
    await listerModuleImpl(requete, resultat, thunkAPI);
};

const listerEntityImpl = async (requete: ReqListerModule, resultat: ResListerModule, thunkAPI) => {
    resultat.listeEntity = await ServiceEntity.lister();
};

const listerFieldParIdEntityImpl = async (requete: ReqListerModule, resultat: ResListerModule, thunkAPI) => {
    if (!requete.idEntity) {
        resultat.listeField = [];
    } else {
        resultat.listeField = await ServiceField.listerParIdEntity(requete.idEntity);
    }
};

const listerModuleImpl = async (requete: ReqListerModule, resultat: ResListerModule, thunkAPI) => {
    resultat.listeModule = await ServiceModule.lister();
};

const majEntityImpl = async (requete: ReqListerModule, resultat: ResListerModule, thunkAPI) => {
    await requete.form?.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form?.getFieldsValue());
    await ServiceEntity.maj(dataForm);
    await listerEntityImpl(requete, resultat, thunkAPI);
};

const majFieldImpl = async (requete: ReqListerModule, resultat: ResListerModule, thunkAPI) => {
    await requete.form?.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form?.getFieldsValue());
    await ServiceField.maj(dataForm);
    await listerFieldParIdEntityImpl(requete, resultat, thunkAPI);
};

const majModuleImpl = async (requete: ReqListerModule, resultat: ResListerModule, thunkAPI) => {
    await requete.form?.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form?.getFieldsValue());
    await ServiceModule.maj(dataForm);
    await listerModuleImpl(requete, resultat, thunkAPI);
};

const supprimerEntityImpl = async (requete: ReqListerModule, resultat: ResListerModule, thunkAPI) => {
    await ServiceEntity.supprimer(requete.idEntity);
    await listerEntityImpl(requete, resultat, thunkAPI);
};

const supprimerFieldImpl = async (requete: ReqListerModule, resultat: ResListerModule, thunkAPI) => {
    await ServiceField.supprimer(requete.idField);
    await listerFieldParIdEntityImpl(requete, resultat, thunkAPI);
};

const supprimerModuleImpl = async (requete: ReqListerModule, resultat: ResListerModule, thunkAPI) => {
    await ServiceModule.supprimer(requete.idModule);
    await listerModuleImpl(requete, resultat, thunkAPI);
};

const CtrlListerModule = {
    creerEntity: action<ReqListerModule, ResListerModule>(creerEntityImpl, ActionModule.UcListerModule.CREER_ENTITY),
    creerField: action<ReqListerModule, ResListerModule>(creerFieldImpl, ActionModule.UcListerModule.CREER_FIELD),
    creerModule: action<ReqListerModule, ResListerModule>(creerModuleImpl, ActionModule.UcListerModule.CREER_MODULE),
    listerEntity: action<ReqListerModule, ResListerModule>(listerEntityImpl, ActionModule.UcListerModule.LISTER_ENTITY),
    listerFieldParIdEntity: action<ReqListerModule, ResListerModule>(listerFieldParIdEntityImpl, ActionModule.UcListerModule.LISTER_FIELD_PAR_ID_ENTITY),
    listerModule: action<ReqListerModule, ResListerModule>(listerModuleImpl, ActionModule.UcListerModule.LISTER_MODULE),
    majEntity: action<ReqListerModule, ResListerModule>(majEntityImpl, ActionModule.UcListerModule.MAJ_ENTITY),
    majField: action<ReqListerModule, ResListerModule>(majFieldImpl, ActionModule.UcListerModule.MAJ_FIELD),
    majModule: action<ReqListerModule, ResListerModule>(majModuleImpl, ActionModule.UcListerModule.MAJ_MODULE),
    supprimerEntity: action<ReqListerModule, ResListerModule>(supprimerEntityImpl, ActionModule.UcListerModule.SUPPRIMER_ENTITY),
    supprimerField: action<ReqListerModule, ResListerModule>(supprimerFieldImpl, ActionModule.UcListerModule.SUPPRIMER_FIELD),
    supprimerModule: action<ReqListerModule, ResListerModule>(supprimerModuleImpl, ActionModule.UcListerModule.SUPPRIMER_MODULE),
};

export default CtrlListerModule;