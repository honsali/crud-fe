import ModuleCommun from 'modules/commun/ModuleCommun';
import ModuleAccueilInvite from './home';
import ModuleRh from 'modules/rh/ModuleRh';

const ListeModuleInvite = [
    ModuleAccueilInvite(),//
    ModuleCommun(), //
    ModuleRh(), // 
];
export default ListeModuleInvite;
