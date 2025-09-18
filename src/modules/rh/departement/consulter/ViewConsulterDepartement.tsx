import { useEffect } from 'react';
import { ActionUcModifier, ActionUcRetourListe, ActionUcSupprimer, BlocAction, Section, useGoToPage } from 'waxant';
import { ActionDepartement } from '../ActionDepartement';
import { PageListerDepartement, PageModifierDepartement } from '../ListePageDepartement';
import EtatDepartement from './element/EtatDepartement';
import useConsulterDepartement from './useConsulterDepartement';

const ViewConsulterDepartement = () => {
    const goToPage = useGoToPage();
    const { etatSupprimerDepartement, resetEtatSupprimerDepartement, supprimerDepartement } = useConsulterDepartement();



    useEffect(() => {
        if (etatSupprimerDepartement.succes) {
            resetEtatSupprimerDepartement();
            goToPage(PageListerDepartement);
        }
    }, [etatSupprimerDepartement.succes]);
    //
    return (
        <Section>
            <EtatDepartement />
            <BlocAction>
                <ActionUcModifier nom={ActionDepartement.UcConsulterDepartement.MODIFIER_DEPARTEMENT} page={PageModifierDepartement} />
                <ActionUcRetourListe nom={ActionDepartement.UcConsulterDepartement.RETOUR_LISTE_DEPARTEMENT} page={PageListerDepartement} />
                <ActionUcSupprimer nom={ActionDepartement.UcConsulterDepartement.SUPPRIMER_DEPARTEMENT} action={supprimerDepartement} rid={etatSupprimerDepartement.rid} />
            </BlocAction>
        </Section>
    );
};

export default ViewConsulterDepartement;