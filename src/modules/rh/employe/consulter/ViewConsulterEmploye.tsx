import { useEffect } from 'react';
import { ActionUcAjouter, ActionUcModifier, ActionUcRetourListe, ActionUcSupprimer, Bloc, BlocAction, MenuOnglet, Onglet, Section, useGoToPage } from 'waxant';
import { ActionEmploye } from '../ActionEmploye';
import { PageFiltrerEmploye, PageModifierConge, PageModifierEmploye } from '../ListePageEmploye';
import EtatEmploye from './element/EtatEmploye';
import TableauConge from './element/TableauConge';
import useConsulterEmploye from './useConsulterEmploye';

const ViewConsulterEmploye = () => {
    const goToPage = useGoToPage();
    const { etatSupprimerEmploye, resetEtatSupprimerEmploye, supprimerEmploye } = useConsulterEmploye();



    useEffect(() => {
        if (etatSupprimerEmploye.succes) {
            resetEtatSupprimerEmploye();
            goToPage(PageFiltrerEmploye);
        }
    }, [etatSupprimerEmploye.succes]);
    //
    return (
        <Section>
            <MenuOnglet>
                <Onglet key="employe" >
                    <Bloc marge="20px">
                        <EtatEmploye />
                        <BlocAction>
                            <ActionUcModifier nom={ActionEmploye.UcConsulterEmploye.MODIFIER_EMPLOYE} page={PageModifierEmploye} />
                            <ActionUcRetourListe nom={ActionEmploye.UcConsulterEmploye.RETOUR_LISTE_EMPLOYE} page={PageFiltrerEmploye} />
                            <ActionUcSupprimer nom={ActionEmploye.UcConsulterEmploye.SUPPRIMER_EMPLOYE} action={supprimerEmploye} rid={etatSupprimerEmploye.rid} />
                        </BlocAction>
                    </Bloc>
                </Onglet>
                <Onglet key="conge" >
                    <Bloc>
                        <TableauConge />
                        <BlocAction>
                            <ActionUcAjouter nom={ActionEmploye.UcConsulterEmploye.AJOUTER_CONGE} page={PageModifierConge} />
                        </BlocAction>
                    </Bloc>
                </Onglet>
            </MenuOnglet>
        </Section>
    );
};

export default ViewConsulterEmploye;