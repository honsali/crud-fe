import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlModifierEmploye from './CtrlModifierEmploye';
import { MdlModifierEmploye, ReqModifierEmploye, selectEmploye, selectEtatMajEmploye, selectEtatRecupererEmployeParId } from './MdlModifierEmploye';

const useModifierEmploye = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatMajEmploye = useSelector(selectEtatMajEmploye);
    const etatRecupererEmployeParId = useSelector(selectEtatRecupererEmployeParId);
    const employe = useSelector(selectEmploye);

    const createAction = (action: any) => (req?: ReqModifierEmploye) => dispatch(action({ ...req, ...params }));

    return {
        // Actions
        majEmploye: createAction(CtrlModifierEmploye.majEmploye),
        recupererEmployeParId: createAction(CtrlModifierEmploye.recupererEmployeParId),
        resetEtatMajEmploye: () => dispatch(MdlModifierEmploye.resetEtatMajEmploye()),
        resetEtatRecupererEmployeParId: () => dispatch(MdlModifierEmploye.resetEtatRecupererEmployeParId()),

        // State
        etatMajEmploye,
        etatRecupererEmployeParId,
        employe,
    };
};

export default useModifierEmploye;