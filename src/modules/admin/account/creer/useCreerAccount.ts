import { FormInstance } from 'antd';
import { ICreateAccountForm } from 'modele/admin/account/DomaineAccount';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'waxant';
import CtrlCreerAccount from './CtrlCreerAccount';
import { MdlCreerAccount, selectEtatCreerAccount, selectIdAccount } from './MdlCreerAccount';

export const useCreerAccount = () => {
    const dispatch = useAppDispatch();
    const etatCreerAccount = useSelector(selectEtatCreerAccount);
    const idAccount = useSelector(selectIdAccount);

    const creerAccount = useCallback(async (form: FormInstance<ICreateAccountForm>) => {
        const values = await form.validateFields();
        const request = {
            username: values.username,
            password: values.password,
            role: { id: values.role },
        };
        return dispatch(CtrlCreerAccount.creerAccount({ request }));
    }, [dispatch]);

    const resetEtatCreerAccount = useCallback(
        () => dispatch(MdlCreerAccount.resetEtatCreerAccount()),
        [dispatch],
    );

    return {
        creerAccount,
        resetEtatCreerAccount,
        etatCreerAccount,
        idAccount,
    };
};
