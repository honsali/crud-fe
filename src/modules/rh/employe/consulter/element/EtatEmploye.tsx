import { useEffect } from 'react';
import { Bloc, CadreBas, FormulaireConsultation, Reference, Texte } from 'waxant';
import useConsulterEmploye from '../useConsulterEmploye';

const EtatEmploye = () => {
    const { employe, recupererEmployeParId } = useConsulterEmploye();

    useEffect(() => {
        recupererEmployeParId();
    }, []);
    //
    return (
        <Bloc largeur="600px">
            <CadreBas titre="employe">
                <FormulaireConsultation modele={employe}>
                    <Texte nom="matricule" />
                    <Texte nom="dateEntree" />
                    <Reference nom="departement" />
                    <Texte nom="fonction" />
                    <Texte nom="description" surTouteLaLigne />
                </FormulaireConsultation>
            </CadreBas>
            <CadreBas titre="personnelle">
                <FormulaireConsultation modele={employe}>
                    <Texte nom="nom" />
                    <Texte nom="prenom" />
                    <Texte nom="dateNaissance" />
                    <Reference nom="sexe" />
                    <Reference nom="situationFamiliale" />
                </FormulaireConsultation>
            </CadreBas>
            <CadreBas titre="contact">
                <FormulaireConsultation modele={employe}>
                    <Texte nom="email" />
                    <Texte nom="telephone" />
                    <Texte nom="ville" seulDansLaLigne />
                    <Texte nom="adresse" surTouteLaLigne />
                </FormulaireConsultation>
            </CadreBas>
        </Bloc>
    );
};

export default EtatEmploye;