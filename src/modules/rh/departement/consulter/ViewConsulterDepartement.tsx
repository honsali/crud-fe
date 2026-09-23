import { ActionUcModifier, ActionUcRetourListe, Bloc, BlocAction, Section } from 'waxant';
import { ActionDepartement } from '../ActionDepartement';
import { PageListerDepartement, PageModifierDepartement } from '../ListePageDepartement';
import EtatDepartement from './element/EtatDepartement';
import ActionSupprimerDepartement from './element/ActionSupprimerDepartement';

const ViewConsulterDepartement = () => {
    return (
        <Section>
            <Bloc largeur="600px" marge="20px" fond="blanc">
                <EtatDepartement />
                <BlocAction>
                    <ActionUcModifier nom={ActionDepartement.UcConsulterDepartement.MODIFIER_DEPARTEMENT} page={PageModifierDepartement} />
                    <ActionUcRetourListe nom={ActionDepartement.UcConsulterDepartement.RETOUR_LISTE_DEPARTEMENT} page={PageListerDepartement} />
                    <ActionSupprimerDepartement />
                </BlocAction>
            </Bloc>
        </Section>
    );
};

export default ViewConsulterDepartement;
