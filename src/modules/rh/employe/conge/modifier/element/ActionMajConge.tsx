import { useEffect } from 'react';
import { ActionUcMaj, useGoToPage } from 'waxant';
import { PageConsulterDepartement } from '../../../../departement/ListePageDepartement';
import { ActionEmploye } from '../../../ActionEmploye';
import useModifierConge from '../useModifierConge';

const ActionMajConge = ({ form }) => {
    const goToPage = useGoToPage();
    const { etatMajConge, majConge, resetEtatMajConge } = useModifierConge();


    const maj = () => {
        majConge({ form });
    };

    useEffect(() => {
        if (etatMajConge.succes) {
            resetEtatMajConge();
            goToPage(PageConsulterDepartement);
        }
    }, [etatMajConge.succes]);
    //
    return (
        <ActionUcMaj nom={ActionEmploye.UcModifierConge.MAJ_CONGE} action={maj} rid={etatMajConge.rid} />
    );
};

export default ActionMajConge;