import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlConsulterDepartement from './CtrlConsulterDepartement';
import { MdlConsulterDepartement, ReqConsulterDepartement, selectDepartement, selectEtatRecupererDepartementParId } from './MdlConsulterDepartement';

const useConsulterDepartement = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatRecupererDepartementParId = useSelector(selectEtatRecupererDepartementParId);
    const departement = useSelector(selectDepartement);

    const createAction = (action: any) => (req?: ReqConsulterDepartement) => dispatch(action({ ...req, ...params }));

    return {
        // Actions
        recupererDepartementParId: createAction(CtrlConsulterDepartement.recupererDepartementParId),
        resetEtatRecupererDepartementParId: () => dispatch(MdlConsulterDepartement.resetEtatRecupererDepartementParId()),

        // State
        etatRecupererDepartementParId,
        departement,
    };
};

export default useConsulterDepartement;