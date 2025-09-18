import MdlConsulterEmploye from './consulter/MdlConsulterEmploye';
import MdlCreerEmploye from './creer/MdlCreerEmploye';
import MdlFiltrerEmploye from './filtrer/MdlFiltrerEmploye';
import MdlModifierConge from './conge/modifier/MdlModifierConge';
import MdlModifierEmploye from './modifier/MdlModifierEmploye';

const ReducerEmploye = {
    mdlConsulterEmploye: MdlConsulterEmploye,
    mdlCreerEmploye: MdlCreerEmploye,
    mdlFiltrerEmploye: MdlFiltrerEmploye,
    mdlModifierConge: MdlModifierConge,
    mdlModifierEmploye: MdlModifierEmploye,
};

export default ReducerEmploye;