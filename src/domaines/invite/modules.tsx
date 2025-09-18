import ModuleCommun from 'modules/commun/ModuleCommun';
import ModuleDepartement from 'modules/rh/departement/ModuleDepartement';
import ModuleEmploye from 'modules/rh/employe/ModuleEmploye';
import ModuleRh from 'modules/rh/ModuleRh';
import ModuleAccueilInvite from './home';

const ListeModuleInvite = [
    ModuleAccueilInvite(),//
    ModuleCommun(), //
    ModuleRh([
        ModuleDepartement(),//
        ModuleEmploye(), //
    ]), // 
];
export default ListeModuleInvite;
