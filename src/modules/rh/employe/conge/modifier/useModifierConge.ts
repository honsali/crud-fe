import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlModifierConge from './CtrlModifierConge';
import { MdlModifierConge, ReqModifierConge, selectConge, selectEtatInitModificationConge, selectEtatMajConge } from './MdlModifierConge';

const useModifierConge = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const conge = useSelector(selectConge);
    const etatInitModificationConge = useSelector(selectEtatInitModificationConge);
    const etatMajConge = useSelector(selectEtatMajConge);

    const createAction = (action: any) => (req?: Partial<ReqModifierConge>) => dispatch(action({ ...req, ...params }));

    return {
        // Actions
        initModificationConge: createAction(CtrlModifierConge.initModificationConge),
        majConge: createAction(CtrlModifierConge.majConge),
        resetEtatInitModificationConge: () => dispatch(MdlModifierConge.resetEtatInitModificationConge()),
        resetEtatMajConge: () => dispatch(MdlModifierConge.resetEtatMajConge()),

        // State
        conge,
        etatInitModificationConge,
        etatMajConge,
    };
};

export default useModifierConge;
