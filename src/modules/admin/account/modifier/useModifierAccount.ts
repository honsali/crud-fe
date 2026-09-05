import { FormInstance } from 'antd';
import { IUpdateAccountForm, IUpdateAccountRequest } from 'modele/admin/account/DomaineAccount';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch, util } from 'waxant';
import CtrlModifierAccount from './CtrlModifierAccount';
import { MdlModifierAccount, ReqModifierAccount, selectAccount, selectEtatInitModificationAccount, selectEtatMajAccount } from './MdlModifierAccount';

const useModifierAccount = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const account = useSelector(selectAccount);
    const etatInitModificationAccount = useSelector(selectEtatInitModificationAccount);
    const etatMajAccount = useSelector(selectEtatMajAccount);

    const createAction = (action: any) => (req?: Partial<ReqModifierAccount>) => dispatch(action({ ...req, ...params }));

    const majAccount = async ({ form, ...req }: Partial<ReqModifierAccount> & { form: FormInstance<IUpdateAccountForm> }) => {
        const values = util.removeNonSerialisable(await form.validateFields()) as IUpdateAccountForm;
        const request: IUpdateAccountRequest = {
            role: { id: values.role },
            activated: values.activated,
            version: values.version,
        };
        return dispatch(CtrlModifierAccount.majAccount({ ...req, request, ...params } as ReqModifierAccount));
    };

    return {
        // Actions
        initModificationAccount: createAction(CtrlModifierAccount.initModificationAccount),
        majAccount,
        resetEtatInitModificationAccount: () => dispatch(MdlModifierAccount.resetEtatInitModificationAccount()),
        resetEtatMajAccount: () => dispatch(MdlModifierAccount.resetEtatMajAccount()),

        // State
        account,
        etatInitModificationAccount,
        etatMajAccount,
    };
};

export default useModifierAccount;
