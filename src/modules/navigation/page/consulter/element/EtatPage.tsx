import { useEffect } from 'react';
import { FormulaireConsultation, Texte } from 'waxant';
import useConsulterPage from '../useConsulterPage';

const EtatPage = () => {
    const { page, recupererPageParId } = useConsulterPage();

    useEffect(() => {
        recupererPageParId();
    }, []);
    //
    return (
        <FormulaireConsultation modele={page} nombreColonne={1}>
            <Texte nom="name" />
        </FormulaireConsultation>
    );
};

export default EtatPage;