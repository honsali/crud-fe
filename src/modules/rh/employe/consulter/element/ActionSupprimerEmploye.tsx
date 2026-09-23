import { useEffect } from 'react';
import { ActionUcSupprimer, useGoToPage } from 'waxant';
import { ActionEmploye } from '../../ActionEmploye';
import { PageFiltrerEmploye } from '../../ListePageEmploye';
import { useSupprimerEmploye } from '../useConsulterEmploye';

const ActionSupprimerEmploye = () => {
    const goToPage = useGoToPage();
    const { etatSupprimerEmploye, resetEtatSupprimerEmploye, supprimerEmploye } = useSupprimerEmploye();


    useEffect(() => {
        if (etatSupprimerEmploye.succes) {
            resetEtatSupprimerEmploye();
            goToPage(PageFiltrerEmploye);
        }
    }, [etatSupprimerEmploye.succes]);
    //
    return (
        <ActionUcSupprimer nom={ActionEmploye.UcConsulterEmploye.SUPPRIMER_EMPLOYE} action={supprimerEmploye} rid={etatSupprimerEmploye.rid} />
    );
};

export default ActionSupprimerEmploye;
