import { FormInstance } from 'antd';
import { IResetPasswordRequest } from 'modele/admin/account/DomaineAccount';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch, util } from 'waxant';
import CtrlConsulterAccount from './CtrlConsulterAccount';
import { MdlConsulterAccount, ReqConsulterAccount, selectAccount, selectEtatRecupererAccountParId, selectEtatReinitialiserMotDePasseAccount } from './MdlConsulterAccount';

const useConsulterAccount = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const account = useSelector(selectAccount);
    const etatRecupererAccountParId = useSelector(selectEtatRecupererAccountParId);
    const etatReinitialiserMotDePasseAccount = useSelector(selectEtatReinitialiserMotDePasseAccount);

    const createAction = (action: any) => (req?: Partial<ReqConsulterAccount>) => dispatch(action({ ...req, ...params }));

    const reinitialiserMotDePasseAccount = async ({ form, ...req }: Partial<ReqConsulterAccount> & { form: FormInstance<IResetPasswordRequest> }) => {
        const values = util.removeNonSerialisable(await form.validateFields()) as IResetPasswordRequest;
        const request: IResetPasswordRequest = { password: values.password };
        return dispatch(CtrlConsulterAccount.reinitialiserMotDePasseAccount({ ...req, request, ...params } as ReqConsulterAccount));
    };

    return {
        // Actions
        recupererAccountParId: createAction(CtrlConsulterAccount.recupererAccountParId),
        reinitialiserMotDePasseAccount,
        resetEtatRecupererAccountParId: () => dispatch(MdlConsulterAccount.resetEtatRecupererAccountParId()),
        resetEtatReinitialiserMotDePasseAccount: () => dispatch(MdlConsulterAccount.resetEtatReinitialiserMotDePasseAccount()),

        // State
        account,
        etatRecupererAccountParId,
        etatReinitialiserMotDePasseAccount,
    };
};

export default useConsulterAccount;
