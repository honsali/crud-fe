import { useEffect } from 'react';
import { Bloc, Colonne, Tableau } from 'waxant';
import useConsulterEmploye from '../useConsulterEmploye';

const TableauConge = () => {
    const { listeConge, listerCongeParIdEmploye } = useConsulterEmploye();

    useEffect(() => {
        listerCongeParIdEmploye();
    }, []);

    //
    return (
        <Bloc>
            <Tableau listeDonnee={listeConge} texteAucunResultat="aucun.conge">
                <Colonne tc="reference" nom="typeConge" />
                <Colonne tc="date" nom="dateDebutConge" />
                <Colonne tc="date" nom="dateFinConge" />
                <Colonne nom="commentaire" />
            </Tableau>
        </Bloc>
    );
};

export default TableauConge;