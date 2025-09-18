import { useEffect } from 'react';
import { ActionUcMaj, useGoToPage } from 'waxant';
import { ActionEmploye } from '../../ActionEmploye';
import { PageConsulterEmploye } from '../../ListePageEmploye';
import useModifierEmploye from '../useModifierEmploye';

const ActionMajEmploye = ({ form }) => {
    const goToPage = useGoToPage();
    const { etatMajEmploye, majEmploye, resetEtatMajEmploye } = useModifierEmploye();


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