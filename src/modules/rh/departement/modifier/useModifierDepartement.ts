import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlModifierDepartement from './CtrlModifierDepartement';
import { MdlModifierDepartement, ReqModifierDepartement, selectDepartement, selectEtatInitModificationDepartement, selectEtatMajDepartement } from './MdlModifierDepartement';

const useModifierDepartement = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const departement = useSelector(selectDepartement);
    const etatInitModificationDepartement = useSelector(selectEtatInitModificationDepartement);
    const etatMajDepartement = useSelector(selectEtatMajDepartement);

    const createAction = (action: any) => (req?: ReqModifierDepartement) => dispatch(action({ ...req, ...params }));

    return {
        // Actions
        initModificationDepartement: createAction(CtrlModifierDepartement.initModificationDepartement),
        majDepartement: createAction(CtrlModifierDepartement.majDepartement),
        resetEtatInitModificationDepartement: () => dispatch(MdlModifierDepartement.resetEtatInitModificationDepartement()),
        resetEtatMajDepartement: () => dispatch(MdlModifierDepartement.resetEtatMajDepartement()),

        // State
        departement,
        etatInitModificationDepartement,
        etatMajDepartement,
    };
};

export default useModifierDepartement;