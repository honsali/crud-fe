import { useEffect } from 'react';
import { FormulaireConsultation, Texte } from 'waxant';
import useConsulterDepartement from '../useConsulterDepartement';

const EtatDepartement = () => {
    const { departement, recupererDepartementParId } = useConsulterDepartement();

    useEffect(() => {
        recupererDepartementParId();
    }, []);
    //
    return (
        <FormulaireConsultation modele={departement} nombreColonne={1}>
            <Texte nom="nom" />
            <Texte nom="description" />
        </FormulaireConsultation>
    );
};

export default EtatDepartement;