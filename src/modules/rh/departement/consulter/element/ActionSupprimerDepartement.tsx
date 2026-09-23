import { useEffect } from 'react';
import { ActionUcSupprimer, useGoToPage } from 'waxant';
import { ActionDepartement } from '../../ActionDepartement';
import { PageListerDepartement } from '../../ListePageDepartement';
import { useSupprimerDepartement } from '../useConsulterDepartement';

const ActionSupprimerDepartement = () => {
    const goToPage = useGoToPage();
    const { etatSupprimerDepartement, resetEtatSupprimerDepartement, supprimerDepartement } = useSupprimerDepartement();

    useEffect(() => {
        if (etatSupprimerDepartement.succes) {
            resetEtatSupprimerDepartement();
            goToPage(PageListerDepartement);
        }
    }, [etatSupprimerDepartement.succes, resetEtatSupprimerDepartement, goToPage]);

    return (
        <ActionUcSupprimer nom={ActionDepartement.UcConsulterDepartement.SUPPRIMER_DEPARTEMENT} action={supprimerDepartement} rid={etatSupprimerDepartement.rid} />
    );
};

export default ActionSupprimerDepartement;
