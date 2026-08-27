import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlCreerAccount from './CtrlCreerAccount';
import { MdlCreerAccount, ReqCreerAccount, selectEtatCreerAccount, selectIdAccount } from './MdlCreerAccount';

const useCreerAccount = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatCreerAccount = useSelector(selectEtatCreerAccount);
    const idAccount = useSelector(selectIdAccount);

    const createAction = (action: any) => (req?: Partial<ReqCreerAccount>) => dispatch(action({ ...req, ...params }));

    return {
        // Actions
        creerAccount: createAction(CtrlCreerAccount.creerAccount),
        resetEtatCreerAccount: () => dispatch(MdlCreerAccount.resetEtatCreerAccount()),

        // State
        etatCreerAccount,
        idAccount,
    };
};

export default useCreerAccount;
