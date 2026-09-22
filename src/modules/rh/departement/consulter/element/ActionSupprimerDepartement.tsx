import { useEffect } from 'react';
import { ActionUcSupprimer, useGoToPage } from 'waxant';
import { ActionDepartement } from '../../ActionDepartement';
import { PageListerDepartement } from '../../ListePageDepartement';
import useSupprimerDepartement from '../useSupprimerDepartement';

const ActionSupprimerDepartement = () => {
    const goToPage = useGoToPage();
    const { supprimerDepartement, resetEtatSupprimerDepartement, etatSupprimerDepartement } = useSupprimerDepartement();

    useEffect(() => {
        if (etatSupprimerDepartement.succes) {
            resetEtatSupprimerDepartement();
            goToPage(PageListerDepartement);
        }
    }, [etatSupprimerDepartement.succes, resetEtatSupprimerDepartement, goToPage]);

    return (
        <ActionUcSupprimer
            nom={ActionDepartement.UcConsulterDepartement.SUPPRIMER_DEPARTEMENT}
            action={supprimerDepartement}
            rid={etatSupprimerDepartement.rid}
        />
    );
};

export default ActionSupprimerDepartement;
