import { useEffect } from 'react';
import { Bloc, FormulaireConsultation, Texte } from 'waxant';
import useConsulterDepartement from '../useConsulterDepartement';

const EtatDepartement = () => {
    const { departement, recupererDepartementParId } = useConsulterDepartement();

    useEffect(() => {
        recupererDepartementParId();
    }, []);
    //
    return (
        <Bloc largeur="600px" marge="20px" fond="blanc">
            <FormulaireConsultation modele={departement} nombreColonne={1}>
                <Texte nom="nom" />
                <Texte nom="description" />
            </FormulaireConsultation>
        </Bloc>
    );
};

export default EtatDepartement;