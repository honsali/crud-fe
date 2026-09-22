import { ActionUcSupprimer, useGoToPage } from 'waxant';
import { ActionDepartement } from '../../ActionDepartement';
import { PageListerDepartement } from '../../ListePageDepartement';
import useCtrlSupprimerDepartement from '../useCtrlSupprimerDepartement';

const ActionSupprimerDepartement = () => {
    const goToPage = useGoToPage();
    const { supprimerDepartement, enCours } = useCtrlSupprimerDepartement(() => goToPage(PageListerDepartement));

    return (
        <ActionUcSupprimer
            nom={ActionDepartement.UcConsulterDepartement.SUPPRIMER_DEPARTEMENT}
            action={supprimerDepartement}
            // Le bouton Waxant utilise encore la présence d'un rid comme indicateur de chargement.
            rid={enCours ? ActionDepartement.UcConsulterDepartement.SUPPRIMER_DEPARTEMENT : null}
        />
    );
};

export default ActionSupprimerDepartement;
