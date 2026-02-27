import { useEffect } from 'react';
import { BlocInline, CadreFort, FormulaireConsultation, Reference, Texte } from 'waxant';
import useConsulterEmploye from '../useConsulterEmploye';

const EtatEmploye = () => {
    const { employe, recupererEmployeParId } = useConsulterEmploye();

    useEffect(() => {
        recupererEmployeParId();
    }, []);
    //
    return (
        <BlocInline>
            <CadreFort titre="employe" largeur="500px">
                <FormulaireConsultation modele={employe}>
                    <Texte nom="matricule" />
                    <Texte nom="dateEntree" />
                    <Reference nom="departement" />
                    <Texte nom="fonction" />
                    <Texte nom="description" surTouteLaLigne />
                </FormulaireConsultation>
            </CadreFort>
            <CadreFort titre="personnelle" largeur="500px">
                <FormulaireConsultation modele={employe}>
                    <Texte nom="nom" />
                    <Texte nom="prenom" />
                    <Texte nom="dateNaissance" />
                    <Reference nom="sexe" />
                    <Reference nom="situationFamiliale" />
                </FormulaireConsultation>
            </CadreFort>
            <CadreFort titre="contact" largeur="500px">
                <FormulaireConsultation modele={employe}>
                    <Texte nom="email" />
                    <Texte nom="telephone" />
                    <Texte nom="ville" seulDansLaLigne />
                    <Texte nom="adresse" surTouteLaLigne />
                </FormulaireConsultation>
            </CadreFort>
        </BlocInline>
    );
};

export default EtatEmploye;
