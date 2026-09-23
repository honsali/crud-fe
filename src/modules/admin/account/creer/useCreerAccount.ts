import { FormInstance } from 'antd';
import { ICreateAccountForm } from 'modele/admin/account/DomaineAccount';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlCreerAccount from './CtrlCreerAccount';
import { MdlCreerAccount, selectEtatCreerAccount, selectIdAccount } from './MdlCreerAccount';

const useCreerAccount = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatCreerAccount = useSelector(selectEtatCreerAccount);
    const idAccount = useSelector(selectIdAccount);

    const creerAccount = async (form: FormInstance<ICreateAccountForm>) => {
        const values = await form.validateFields();
        const request = {
            username: values.username,
            password: values.password,
            role: { id: values.role },
        };
        return dispatch(CtrlCreerAccount.creerAccount({ request, ...params }));
    };

    return {
        // Actions
        creerAccount,
        resetEtatCreerAccount: () => dispatch(MdlCreerAccount.resetEtatCreerAccount()),

        // State
        etatCreerAccount,
        idAccount,
    };
};

export default useCreerAccount;
