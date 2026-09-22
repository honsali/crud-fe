import { FormulaireConsultation, Texte } from 'waxant';
import useConsulterDepartement from '../useConsulterDepartement';

const EtatDepartement = () => {
    const { departement } = useConsulterDepartement();

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
