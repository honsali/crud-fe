import { FormulaireConsultation, Texte } from 'waxant';
import useCtrlConsulterDepartement from '../useCtrlConsulterDepartement';

const EtatDepartement = () => {
    const { departement } = useCtrlConsulterDepartement();

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
