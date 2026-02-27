import { useEffect } from 'react';
import { ActionUcModifier, ActionUcRetourListe, ActionUcSupprimer, Bloc, BlocAction, FormulaireConsultation, Reference, Texte, useGoToPage } from 'waxant';
import { ActionEmploye } from '../../../ActionEmploye';
import { PageConsulterEmploye, PageModifierConge } from '../../../ListePageEmploye';
import useConsulterConge from '../useConsulterConge';

const EtatConge = () => {
    const goToPage = useGoToPage();
    const { conge, etatSupprimerConge, recupererCongeParId, resetEtatSupprimerConge, supprimerConge } = useConsulterConge();

    useEffect(() => {
        recupererCongeParId();
    }, []);



    useEffect(() => {
        if (etatSupprimerConge.succes) {
            resetEtatSupprimerConge();
            goToPage(PageConsulterEmploye);
        }
    }, [etatSupprimerConge.succes]);
    //
    return (
        <Bloc largeur="600px" marge="20px" fond="blanc">
            <FormulaireConsultation modele={conge} nombreColonne={1}>
                <Reference nom="typeConge" />
                <Texte nom="dateDebutConge" />
                <Texte nom="dateFinConge" />
            </FormulaireConsultation>
            <BlocAction>
                <ActionUcModifier nom={ActionEmploye.UcConsulterConge.MODIFIER_CONGE} page={PageModifierConge} />
                <ActionUcRetourListe nom={ActionEmploye.UcConsulterConge.RETOUR_LISTE_CONGE} page={PageConsulterEmploye} />
                <ActionUcSupprimer nom={ActionEmploye.UcConsulterConge.SUPPRIMER_CONGE} action={supprimerConge} rid={etatSupprimerConge.rid} />
            </BlocAction>
        </Bloc>
    );
};

export default EtatConge;