import { FormInstance } from 'antd';
import { useEffect } from 'react';
import { ActionUcMaj, useGoToPage } from 'waxant';
import { ActionEmploye } from '../../ActionEmploye';
import { PageConsulterEmploye } from '../../ListePageEmploye';
import { useMajEmploye } from '../useModifierEmploye';

const ActionMajEmploye = ({ form }: { form: FormInstance }) => {
    const goToPage = useGoToPage();
    const { etatMajEmploye, majEmploye, resetEtatMajEmploye } = useMajEmploye();

    const maj = () => {
        majEmploye({ form });
    };

    useEffect(() => {
        if (etatMajEmploye.succes) {
            resetEtatMajEmploye();
            goToPage(PageConsulterEmploye);
        }
    }, [etatMajEmploye.succes]);
    //
    return (
        <ActionUcMaj nom={ActionEmploye.UcModifierEmploye.MAJ_EMPLOYE} action={maj} rid={etatMajEmploye.rid} />
    );
};

export default ActionMajEmploye;
