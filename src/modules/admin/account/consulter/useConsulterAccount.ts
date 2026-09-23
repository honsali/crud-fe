import { FormInstance } from 'antd';
import { IResetPasswordRequest } from 'modele/admin/account/DomaineAccount';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch, util } from 'waxant';
import CtrlConsulterAccount from './CtrlConsulterAccount';
import { MdlConsulterAccount, ReqConsulterAccount, selectAccount, selectEtatReinitialiserMotDePasseAccount } from './MdlConsulterAccount';

export const useRecupererAccountParId = () => {
    const dispatch = useAppDispatch();
    const { idAccount } = useParams();
    const account = useSelector(selectAccount);

    useEffect(() => {
        dispatch(CtrlConsulterAccount.recupererAccountParId({ idAccount } as ReqConsulterAccount));
    }, [dispatch, idAccount]);

    return { account };
};

export const useReinitialiserMotDePasseAccount = () => {
    const dispatch = useAppDispatch();
    const { idAccount } = useParams();
    const account = useSelector(selectAccount);
    const etatReinitialiserMotDePasseAccount = useSelector(selectEtatReinitialiserMotDePasseAccount);

    const reinitialiserMotDePasseAccount = useCallback(async ({ form, ...req }: Partial<ReqConsulterAccount> & { form: FormInstance<IResetPasswordRequest> }) => {
        const values = util.removeNonSerialisable(await form.validateFields()) as IResetPasswordRequest;
        const request: IResetPasswordRequest = { password: values.password };
        return dispatch(CtrlConsulterAccount.reinitialiserMotDePasseAccount({ ...req, request, idAccount } as ReqConsulterAccount));
    }, [dispatch, idAccount]);

    const resetEtatReinitialiserMotDePasseAccount = useCallback(
        () => dispatch(MdlConsulterAccount.resetEtatReinitialiserMotDePasseAccount()),
        [dispatch],
    );

    return {
        reinitialiserMotDePasseAccount,
        resetEtatReinitialiserMotDePasseAccount,
        account,
        etatReinitialiserMotDePasseAccount,
    };
};
