import { useEffect } from 'react';
import { ActionUcMaj, useGoToPage } from 'waxant';
import { ActionEmploye } from '../../../ActionEmploye';
import { PageConsulterConge } from '../../../ListePageEmploye';
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
            goToPage(PageConsulterConge);
        }
    }, [etatMajConge.succes]);
    //
    return (
        <ActionUcMaj nom={ActionEmploye.UcModifierConge.MAJ_CONGE} action={maj} rid={etatMajConge.rid} />
    );
};

export default ActionMajConge;