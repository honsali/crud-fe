import { useEffect } from 'react';
import { ActionUcModifier, ActionUcRetourConsulter, ActionUcSupprimer, Bloc, BlocAction, Section, useGoToPage } from 'waxant';
import { ActionPage } from '../ActionPage';
import { PageListerPage, PageModifierPage } from '../ListePagePage';
import EtatPage from './element/EtatPage';
import useConsulterPage from './useConsulterPage';

const ViewConsulterPage = () => {
    const goToPage = useGoToPage();
    const { etatSupprimerPage, resetEtatSupprimerPage, supprimerPage } = useConsulterPage();


    useEffect(() => {
        if (etatSupprimerPage.succes) {
            resetEtatSupprimerPage();
            goToPage(PageListerPage);
        }
    }, [etatSupprimerPage.succes]);
    //
    return (
        <Section>
            <Bloc largeur="600px" marge="20px" fond="blanc">
                <EtatPage />
                <BlocAction>
                    <ActionUcModifier nom={ActionPage.UcConsulterPage.MODIFIER_PAGE} page={PageModifierPage} />
                    <ActionUcRetourConsulter nom={ActionPage.UcConsulterPage.RETOUR_CONSULTER_PAGE} page={PageListerPage} />
                    <ActionUcSupprimer nom={ActionPage.UcConsulterPage.SUPPRIMER_PAGE} action={supprimerPage} rid={etatSupprimerPage.rid} />
                </BlocAction>
            </Bloc>
        </Section>
    );
};

export default ViewConsulterPage;