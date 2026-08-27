import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlListerAccount from './CtrlListerAccount';
import { MdlListerAccount, ReqListerAccount, selectEtatListerAccount, selectListeAccount } from './MdlListerAccount';

const useListerAccount = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatListerAccount = useSelector(selectEtatListerAccount);
    const listeAccount = useSelector(selectListeAccount);

    const createAction = (action: any) => (req?: Partial<ReqListerAccount>) => dispatch(action({ ...req, ...params }));

    return {
        // Actions
        listerAccount: createAction(CtrlListerAccount.listerAccount),
        resetEtatListerAccount: () => dispatch(MdlListerAccount.resetEtatListerAccount()),

        // State
        etatListerAccount,
        listeAccount,
    };
};

export default useListerAccount;
