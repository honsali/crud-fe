import { IDepartement } from 'modele/rh/departement/DomaineDepartement';
import { Bloc, Colonne, Tableau, useGoToPage } from 'waxant';
import { PageConsulterDepartement } from '../../ListePageDepartement';
import { useListerDepartement } from '../useListerDepartement';

const TableauDepartement = () => {
    const goToPage = useGoToPage();
    const { listeDepartement } = useListerDepartement();

    const goToPageConsulterDepartement = (departement: IDepartement) => {
        goToPage(PageConsulterDepartement, { idDepartement: departement.id });
    };

    //
    return (
        <Bloc>
            <Tableau listeDonnee={listeDepartement} siClicLigne={goToPageConsulterDepartement} texteAucunResultat="aucun.departement">
                <Colonne nom="nom" />
                <Colonne nom="description" />
            </Tableau>
        </Bloc>
    );
};

export default TableauDepartement;
