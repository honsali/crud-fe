import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlModifierEmploye from './CtrlModifierEmploye';
import { MdlModifierEmploye, ReqModifierEmploye, selectEmploye, selectEtatInitModificationEmploye, selectEtatMajEmploye } from './MdlModifierEmploye';

const useModifierEmploye = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const employe = useSelector(selectEmploye);
    const etatInitModificationEmploye = useSelector(selectEtatInitModificationEmploye);
    const etatMajEmploye = useSelector(selectEtatMajEmploye);

    const createAction = (action: any) => (req?: ReqModifierEmploye) => dispatch(action({ ...req, ...params }));

    return {
        // Actions
        initModificationEmploye: createAction(CtrlModifierEmploye.initModificationEmploye),
        majEmploye: createAction(CtrlModifierEmploye.majEmploye),
        resetEtatInitModificationEmploye: () => dispatch(MdlModifierEmploye.resetEtatInitModificationEmploye()),
        resetEtatMajEmploye: () => dispatch(MdlModifierEmploye.resetEtatMajEmploye()),

        // State
        employe,
        etatInitModificationEmploye,
        etatMajEmploye,
    };
};

export default useModifierEmploye;