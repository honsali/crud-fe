import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlCreerDepartement from './CtrlCreerDepartement';
import { MdlCreerDepartement, ReqCreerDepartement, selectEtatCreerDepartement, selectIdDepartement } from './MdlCreerDepartement';

const useCreerDepartement = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatCreerDepartement = useSelector(selectEtatCreerDepartement);
    const idDepartement = useSelector(selectIdDepartement);

    const createAction = (action: any) => (req?: ReqCreerDepartement) => dispatch(action({ ...req, ...params }));

    return {
        // Actions
        creerDepartement: createAction(CtrlCreerDepartement.creerDepartement),
        resetEtatCreerDepartement: () => dispatch(MdlCreerDepartement.resetEtatCreerDepartement()),

        // State
        etatCreerDepartement,
        idDepartement,
    };
};

export default useCreerDepartement;