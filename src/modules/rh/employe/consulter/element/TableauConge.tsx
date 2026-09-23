import { IConge } from 'modele/rh/conge/DomaineConge';
import { Bloc, Colonne, Tableau, useGoToPage } from 'waxant';
import { PageConsulterConge } from '../../ListePageEmploye';
import { useListerCongeParIdEmploye } from '../useConsulterEmploye';

const TableauConge = () => {
    const goToPage = useGoToPage();
    const { listeConge } = useListerCongeParIdEmploye();

    const goToPageConsulterConge = (conge: IConge) => {
        goToPage(PageConsulterConge, { idConge: conge.id });
    };

    //
    return (
        <Bloc>
            <Tableau listeDonnee={listeConge} siClicLigne={goToPageConsulterConge} texteAucunResultat="aucun.conge">
                <Colonne nom="code" />
                <Colonne tc="reference" nom="typeConge" />
                <Colonne tc="date" nom="dateDebutConge" />
                <Colonne tc="date" nom="dateFinConge" />
                <Colonne nom="commentaire" />
            </Tableau>
        </Bloc>
    );
};

export default TableauConge;
