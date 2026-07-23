import ModuleCommun from 'modules/commun/ModuleCommun';
import ModuleDepartement from 'modules/rh/departement/ModuleDepartement';
import ModuleEmploye from 'modules/rh/employe/ModuleEmploye';
import ModuleRh from 'modules/rh/ModuleRh';
import ModuleAccueilRh from './home';

const ListeModuleRh = [
    ModuleAccueilRh(),
    ModuleCommun(),
    ModuleRh([
        ModuleDepartement(),
        ModuleEmploye(),
    ]),
];

export default ListeModuleRh;
