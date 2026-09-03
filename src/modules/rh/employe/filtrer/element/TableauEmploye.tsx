import { IEmploye } from 'modele/rh/employe/DomaineEmploye';
import { Bloc, Colonne, Tableau, useGoToPage } from 'waxant';
import { PageConsulterEmploye } from '../../ListePageEmploye';
import useFiltrerEmploye from '../useFiltrerEmploye';

const TableauEmploye = () => {
    const goToPage = useGoToPage();
    const { changerPageFiltrerEmploye, listePagineeEmploye } = useFiltrerEmploye();

    const actionChangementPage = (pageCourante: number) => {
        changerPageFiltrerEmploye({ pageCourante });
    };

    const goToPageConsulterEmploye = (employe: IEmploye) => {
        goToPage(PageConsulterEmploye, { idEmploye: employe.id });
    };
    //
    return (
        <Bloc>
            <Tableau listeDonnee={listePagineeEmploye?.liste} pagination={listePagineeEmploye?.pagination} siClicLigne={goToPageConsulterEmploye} siChangementPage={actionChangementPage} texteAucunResultat="aucun.employe">
                <Colonne nom="matricule" />
                <Colonne nom="nom" />
                <Colonne nom="prenom" />
                <Colonne nom="fonction" />
                <Colonne tc="reference" nom="departement" />
            </Tableau>
        </Bloc>
    );
};

export default TableauEmploye;
