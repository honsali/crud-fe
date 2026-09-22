import ServiceDepartement from 'modele/rh/departement/ServiceDepartement';
import { FormulaireConsultation, Texte, useRecupererParId } from 'waxant';
import { ActionDepartement } from '../../ActionDepartement';

const EtatDepartement = () => {
    const departement = useRecupererParId(
        'idDepartement',
        ServiceDepartement.recupererParId,
        ActionDepartement.UcConsulterDepartement.RECUPERER_DEPARTEMENT_PAR_ID,
    );

    if (!departement) {
        return null;
    }

    return (
        <FormulaireConsultation modele={departement} nombreColonne={1}>
            <Texte nom="nom" />
            <Texte nom="description" />
        </FormulaireConsultation>
    );
};

export default EtatDepartement;
