import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlModifierAccount from './CtrlModifierAccount';
import { MdlModifierAccount, ReqModifierAccount, selectAccount, selectEtatInitModificationAccount, selectEtatMajAccount } from './MdlModifierAccount';

const useModifierAccount = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const account = useSelector(selectAccount);
    const etatInitModificationAccount = useSelector(selectEtatInitModificationAccount);
    const etatMajAccount = useSelector(selectEtatMajAccount);

    const createAction = (action: any) => (req?: Partial<ReqModifierAccount>) => dispatch(action({ ...req, ...params }));

    return {
        // Actions
        initModificationAccount: createAction(CtrlModifierAccount.initModificationAccount),
        majAccount: createAction(CtrlModifierAccount.majAccount),
        resetEtatInitModificationAccount: () => dispatch(MdlModifierAccount.resetEtatInitModificationAccount()),
        resetEtatMajAccount: () => dispatch(MdlModifierAccount.resetEtatMajAccount()),

        // State
        account,
        etatInitModificationAccount,
        etatMajAccount,
    };
};

export default useModifierAccount;
