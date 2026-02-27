import { useEffect } from 'react';
import { ActionUcMaj, useGoToPage } from 'waxant';
import { ActionDepartement } from '../../ActionDepartement';
import { PageConsulterDepartement } from '../../ListePageDepartement';
import useModifierDepartement from '../useModifierDepartement';

const ActionMajDepartement = ({ form }) => {
    const goToPage = useGoToPage();
    const { etatMajDepartement, majDepartement, resetEtatMajDepartement } = useModifierDepartement();

    const maj = () => {
        majDepartement({ form });
    };

    useEffect(() => {
        if (etatMajDepartement.succes) {
            resetEtatMajDepartement();
            goToPage(PageConsulterDepartement);
        }
    }, [etatMajDepartement.succes]);
    //
    return (
        <ActionUcMaj nom={ActionDepartement.UcModifierDepartement.MAJ_DEPARTEMENT} action={maj} rid={etatMajDepartement.rid} />
    );
};

export default ActionMajDepartement;