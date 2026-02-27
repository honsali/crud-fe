import { useEffect } from 'react';
import { Bloc, Colonne, Tableau, useGoToPage } from 'waxant';
import { PageConsulterConge } from '../../ListePageEmploye';
import useConsulterEmploye from '../useConsulterEmploye';

const TableauConge = () => {
    const goToPage = useGoToPage();
    const { listeConge, listerCongeParIdEmploye } = useConsulterEmploye();

    const goToPageConsulterConge = (conge) => {
        goToPage(PageConsulterConge, conge);
    };

    useEffect(() => {
        listerCongeParIdEmploye();
    }, []);
    //
    return (
        <Bloc>
            <Tableau listeDonnee={listeConge} siClicLigne={goToPageConsulterConge} texteAucunResultat="aucun.conge">
                <Colonne tc="reference" nom="typeConge" />
                <Colonne tc="date" nom="dateDebutConge" />
                <Colonne tc="date" nom="dateFinConge" />
                <Colonne nom="commentaire" />
            </Tableau>
        </Bloc>
    );
};

export default TableauConge;