import { FormInstance } from 'antd';
import { useEffect } from 'react';
import { ActionUcCreer, useGoToPage } from 'waxant';
import { ActionAccount } from '../../ActionAccount';
import { PageConsulterAccount } from '../../ListePageAccount';
import useCreerAccount from '../useCreerAccount';

const ActionCreerAccount = ({ form }: { form: FormInstance }) => {
    const goToPage = useGoToPage();
    const { creerAccount, etatCreerAccount, idAccount, resetEtatCreerAccount } = useCreerAccount();

    const creer = () => {
        creerAccount({ form });
    };

    useEffect(() => {
        if (etatCreerAccount.succes) {
            resetEtatCreerAccount();
            goToPage(PageConsulterAccount, { idAccount });
        }
    }, [etatCreerAccount.succes]);
    //
    return (
        <ActionUcCreer nom={ActionAccount.UcCreerAccount.CREER_ACCOUNT} action={creer} rid={etatCreerAccount.rid} />
    );
};

export default ActionCreerAccount;
