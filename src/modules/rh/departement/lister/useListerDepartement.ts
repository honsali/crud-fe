import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlListerDepartement from './CtrlListerDepartement';
import { MdlListerDepartement, ReqListerDepartement, selectEtatListerDepartement, selectListeDepartement } from './MdlListerDepartement';

const useListerDepartement = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatListerDepartement = useSelector(selectEtatListerDepartement);
    const listeDepartement = useSelector(selectListeDepartement);

    const createAction = (action: any) => (req?: Partial<ReqListerDepartement>) => dispatch(action({ ...req, ...params }));

    return {
        // Actions
        listerDepartement: createAction(CtrlListerDepartement.listerDepartement),
        resetEtatListerDepartement: () => dispatch(MdlListerDepartement.resetEtatListerDepartement()),

        // State
        etatListerDepartement,
        listeDepartement,
    };
};

export default useListerDepartement;
