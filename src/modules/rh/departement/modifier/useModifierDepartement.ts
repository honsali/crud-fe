import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlModifierDepartement from './CtrlModifierDepartement';
import { MdlModifierDepartement, ReqModifierDepartement, selectDepartement, selectEtatEnregistrerDepartement, selectEtatInitModificationDepartement } from './MdlModifierDepartement';

const useModifierDepartement = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatInitModificationDepartement = useSelector(selectEtatInitModificationDepartement);
    const departement = useSelector(selectDepartement);
    const etatEnregistrerDepartement = useSelector(selectEtatEnregistrerDepartement);

    const createAction = (action: any) => (req?: ReqModifierDepartement) => dispatch(action({ ...req, ...params }));

    return {
        // Actions
        enregistrerDepartement: createAction(CtrlModifierDepartement.enregistrerDepartement),
        initModificationDepartement: createAction(CtrlModifierDepartement.initModificationDepartement),
        resetEtatEnregistrerDepartement: () => dispatch(MdlModifierDepartement.resetEtatEnregistrerDepartement()),
        resetEtatInitModificationDepartement: () => dispatch(MdlModifierDepartement.resetEtatInitModificationDepartement()),

        // State
        etatInitModificationDepartement,
        departement,
        etatEnregistrerDepartement,
    };
};

export default useModifierDepartement;