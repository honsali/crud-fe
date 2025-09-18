import { useEffect } from 'react';
import { Bloc, Colonne, Tableau, useGoToPage } from 'waxant';
import { PageConsulterDepartement } from '../../ListePageDepartement';
import useListerDepartement from '../useListerDepartement';

const TableauDepartement = () => {
    const goToPage = useGoToPage();
    const { listeDepartement, listerDepartement } = useListerDepartement();

    const goToPageConsulterDepartement = (departement) => {
        goToPage(PageConsulterDepartement, departement);
    };

    useEffect(() => {
        listerDepartement();
    }, []);

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