import MdlConsulterConge from './conge/consulter/MdlConsulterConge';
import MdlConsulterEmploye from './consulter/MdlConsulterEmploye';
import MdlCreerConge from './conge/creer/MdlCreerConge';
import MdlCreerEmploye from './creer/MdlCreerEmploye';
import MdlFiltrerEmploye from './filtrer/MdlFiltrerEmploye';
import MdlModifierConge from './conge/modifier/MdlModifierConge';
import MdlModifierEmploye from './modifier/MdlModifierEmploye';

const ReducerEmploye = {
    mdlConsulterConge: MdlConsulterConge,
    mdlConsulterEmploye: MdlConsulterEmploye,
    mdlCreerConge: MdlCreerConge,
    mdlCreerEmploye: MdlCreerEmploye,
    mdlFiltrerEmploye: MdlFiltrerEmploye,
    mdlModifierConge: MdlModifierConge,
    mdlModifierEmploye: MdlModifierEmploye,
};

export default ReducerEmploye;