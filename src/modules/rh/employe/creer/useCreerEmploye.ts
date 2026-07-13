import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlCreerEmploye from './CtrlCreerEmploye';
import { MdlCreerEmploye, ReqCreerEmploye, selectEtatCreerEmploye, selectIdEmploye } from './MdlCreerEmploye';

const useCreerEmploye = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatCreerEmploye = useSelector(selectEtatCreerEmploye);
    const idEmploye = useSelector(selectIdEmploye);

    const createAction = (action: any) => (req?: ReqCreerEmploye) => dispatch(action({ ...req, ...params }));

    return {
        // Actions
        creerEmploye: createAction(CtrlCreerEmploye.creerEmploye),
        resetEtatCreerEmploye: () => dispatch(MdlCreerEmploye.resetEtatCreerEmploye()),

        // State
        etatCreerEmploye,
        idEmploye,
    };
};

export default useCreerEmploye;