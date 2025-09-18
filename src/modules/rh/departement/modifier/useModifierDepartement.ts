import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlModifierDepartement from './CtrlModifierDepartement';
import { MdlModifierDepartement, ReqModifierDepartement, selectDepartement, selectEtatMajDepartement, selectEtatRecupererDepartementParId } from './MdlModifierDepartement';

const useModifierDepartement = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatMajDepartement = useSelector(selectEtatMajDepartement);
    const etatRecupererDepartementParId = useSelector(selectEtatRecupererDepartementParId);
    const departement = useSelector(selectDepartement);

    const createAction = (action: any) => (req?: ReqModifierDepartement) => dispatch(action({ ...req, ...params }));

    return {
        // Actions
        majDepartement: createAction(CtrlModifierDepartement.majDepartement),
        recupererDepartementParId: createAction(CtrlModifierDepartement.recupererDepartementParId),
        resetEtatMajDepartement: () => dispatch(MdlModifierDepartement.resetEtatMajDepartement()),
        resetEtatRecupererDepartementParId: () => dispatch(MdlModifierDepartement.resetEtatRecupererDepartementParId()),

        // State
        etatMajDepartement,
        etatRecupererDepartementParId,
        departement,
    };
};

export default useModifierDepartement;