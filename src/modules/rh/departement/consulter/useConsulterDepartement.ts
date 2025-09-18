import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlConsulterDepartement from './CtrlConsulterDepartement';
import { MdlConsulterDepartement, ReqConsulterDepartement, selectDepartement, selectEtatRecupererDepartementParId, selectEtatSupprimerDepartement } from './MdlConsulterDepartement';

const useConsulterDepartement = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatRecupererDepartementParId = useSelector(selectEtatRecupererDepartementParId);
    const departement = useSelector(selectDepartement);
    const etatSupprimerDepartement = useSelector(selectEtatSupprimerDepartement);

    const createAction = (action: any) => (req?: ReqConsulterDepartement) => dispatch(action({ ...req, ...params }));

    return {
        // Actions
        recupererDepartementParId: createAction(CtrlConsulterDepartement.recupererDepartementParId),
        supprimerDepartement: createAction(CtrlConsulterDepartement.supprimerDepartement),
        resetEtatRecupererDepartementParId: () => dispatch(MdlConsulterDepartement.resetEtatRecupererDepartementParId()),
        resetEtatSupprimerDepartement: () => dispatch(MdlConsulterDepartement.resetEtatSupprimerDepartement()),

        // State
        etatRecupererDepartementParId,
        departement,
        etatSupprimerDepartement,
    };
};

export default useConsulterDepartement;