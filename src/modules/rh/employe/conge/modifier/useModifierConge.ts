import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlModifierConge from './CtrlModifierConge';
import { MdlModifierConge, ReqModifierConge, selectConge, selectEtatMajConge, selectEtatRecupererCongeParId } from './MdlModifierConge';

const useModifierConge = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatRecupererCongeParId = useSelector(selectEtatRecupererCongeParId);
    const conge = useSelector(selectConge);
    const etatMajConge = useSelector(selectEtatMajConge);

    const createAction = (action: any) => (req?: ReqModifierConge) => dispatch(action({ ...req, ...params }));

    return {
        // Actions
        majConge: createAction(CtrlModifierConge.majConge),
        recupererCongeParId: createAction(CtrlModifierConge.recupererCongeParId),
        resetEtatMajConge: () => dispatch(MdlModifierConge.resetEtatMajConge()),
        resetEtatRecupererCongeParId: () => dispatch(MdlModifierConge.resetEtatRecupererCongeParId()),

        // State
        etatRecupererCongeParId,
        conge,
        etatMajConge,
    };
};

export default useModifierConge;