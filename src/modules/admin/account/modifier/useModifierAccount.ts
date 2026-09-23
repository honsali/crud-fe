import { FormInstance } from 'antd';
import { IUpdateAccountForm, IUpdateAccountRequest } from 'modele/admin/account/DomaineAccount';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch, util } from 'waxant';
import CtrlModifierAccount from './CtrlModifierAccount';
import { MdlModifierAccount, ReqModifierAccount, selectAccount, selectEtatInitModificationAccount, selectEtatMajAccount } from './MdlModifierAccount';

export const useInitModificationAccount = () => {
    const dispatch = useAppDispatch();
    const { idAccount } = useParams();
    const account = useSelector(selectAccount);
    const etatInitModificationAccount = useSelector(selectEtatInitModificationAccount);

    useEffect(() => {
        dispatch(CtrlModifierAccount.initModificationAccount({ idAccount } as ReqModifierAccount));
    }, [dispatch, idAccount]);

    return {
        account,
        etatInitModificationAccount,
    };
};

export const useMajAccount = () => {
    const dispatch = useAppDispatch();
    const { idAccount } = useParams();
    const etatMajAccount = useSelector(selectEtatMajAccount);

    const majAccount = useCallback(async ({ form, ...req }: Partial<ReqModifierAccount> & { form: FormInstance<IUpdateAccountForm> }) => {
        const values = util.removeNonSerialisable(await form.validateFields()) as IUpdateAccountForm;
        const request: IUpdateAccountRequest = {
            role: { id: values.role },
            activated: values.activated,
            version: values.version,
        };
        return dispatch(CtrlModifierAccount.majAccount({ ...req, request, idAccount } as ReqModifierAccount));
    }, [dispatch, idAccount]);

    const resetEtatMajAccount = useCallback(
        () => dispatch(MdlModifierAccount.resetEtatMajAccount()),
        [dispatch],
    );

    return {
        majAccount,
        resetEtatMajAccount,
        etatMajAccount,
    };
};
