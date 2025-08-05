import { ActionUcModifier, ActionUcRetourListe, BlocAction, Section } from 'waxant';
import { ActionRh } from '../../ActionRh';
import { PageListerDepartement, PageModifierDepartement } from '../../ListePageRh';
import EtatDepartement from './element/EtatDepartement';

const ViewConsulterDepartement = () => {
    //
    return (
        <Section>
            <EtatDepartement />
            <BlocAction>
                <ActionUcModifier nom={ActionRh.UcConsulterDepartement.MODIFIER_DEPARTEMENT} page={PageModifierDepartement} />
                <ActionUcRetourListe nom={ActionRh.UcConsulterDepartement.RETOUR_LISTE_DEPARTEMENT} page={PageListerDepartement} />
            </BlocAction>
        </Section>
    );
};

export default ViewConsulterDepartement;