import { FormulaireConsultation, Texte } from 'waxant';
import { useRecupererDepartementParId } from '../useConsulterDepartement';

const EtatDepartement = () => {
    const { departement } = useRecupererDepartementParId();
    //
    return (
        <FormulaireConsultation modele={departement} nombreColonne={1}>
            <Texte nom="nom" />
            <Texte nom="description" />
        </FormulaireConsultation>
    );
};

export default EtatDepartement;
