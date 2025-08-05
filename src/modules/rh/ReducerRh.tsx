import MdlConsulterDepartement from './departement/consulter/MdlConsulterDepartement';
import MdlCreerDepartement from './departement/creer/MdlCreerDepartement';
import MdlListerDepartement from './departement/lister/MdlListerDepartement';
import MdlModifierDepartement from './departement/modifier/MdlModifierDepartement';

const ReducerRh = {
    mdlConsulterDepartement: MdlConsulterDepartement,
    mdlCreerDepartement: MdlCreerDepartement,
    mdlListerDepartement: MdlListerDepartement,
    mdlModifierDepartement: MdlModifierDepartement,
};

export default ReducerRh;