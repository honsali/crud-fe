import { ActionUcAjouter, ActionUcModifier, ActionUcRetourListe, Bloc, BlocAction, MenuOnglet, Onglet, Section } from 'waxant';
import { ActionEmploye } from '../ActionEmploye';
import { PageCreerConge, PageFiltrerEmploye, PageModifierEmploye } from '../ListePageEmploye';
import ActionSupprimerEmploye from './element/ActionSupprimerEmploye';
import EtatEmploye from './element/EtatEmploye';
import TableauConge from './element/TableauConge';

const ViewConsulterEmploye = () => {
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
                            <ActionSupprimerEmploye />
                        </BlocAction>
                    </Bloc>
                </Onglet>
                <Onglet key="conge" >
                    <Bloc marge="20px">
                        <TableauConge />
                        <BlocAction>
                            <ActionUcAjouter nom={ActionEmploye.UcConsulterEmploye.AJOUTER_CONGE} page={PageCreerConge} />
                        </BlocAction>
                    </Bloc>
                </Onglet>
            </MenuOnglet>
        </Section>
    );
};

export default ViewConsulterEmploye;
