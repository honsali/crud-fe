import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlCreerConge from './CtrlCreerConge';
import { MdlCreerConge, ReqCreerConge, selectEtatCreerConge, selectIdConge } from './MdlCreerConge';

const useCreerConge = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatCreerConge = useSelector(selectEtatCreerConge);
    const idConge = useSelector(selectIdConge);

    const createAction = (action: any) => (req?: Partial<ReqCreerConge>) => dispatch(action({ ...req, ...params }));

    return {
        // Actions
        creerConge: createAction(CtrlCreerConge.creerConge),
        resetEtatCreerConge: () => dispatch(MdlCreerConge.resetEtatCreerConge()),

        // State
        etatCreerConge,
        idConge,
    };
};

export default useCreerConge;