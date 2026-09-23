import { FormInstance } from 'antd';
import { useEffect } from 'react';
import { ActionUcMaj, useGoToPage } from 'waxant';
import { ActionAccount } from '../../ActionAccount';
import { PageConsulterAccount } from '../../ListePageAccount';
import useModifierAccount from '../useModifierAccount';

const ActionMajAccount = ({ form }: { form: FormInstance }) => {
    const goToPage = useGoToPage();
    const { etatMajAccount, majAccount, resetEtatMajAccount } = useModifierAccount();

    const maj = () => {
        majAccount({ form });
    };

    useEffect(() => {
        if (etatMajAccount.succes) {
            resetEtatMajAccount();
            goToPage(PageConsulterAccount);
        }
    }, [etatMajAccount.succes]);
    //
    return (
        <ActionUcMaj nom={ActionAccount.UcModifierAccount.MAJ_ACCOUNT} action={maj} rid={etatMajAccount.rid} />
    );
};

export default ActionMajAccount;
