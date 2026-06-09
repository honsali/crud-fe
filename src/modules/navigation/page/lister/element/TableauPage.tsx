import { useEffect } from 'react';
import { Bloc, Colonne, Tableau, useGoToPage } from 'waxant';
import { PageConsulterPage } from '../../ListePagePage';
import useListerPage from '../useListerPage';

const TableauPage = () => {
    const goToPage = useGoToPage();
    const { listePage, listerPage } = useListerPage();

    const goToPageConsulterPage = (page) => {
        goToPage(PageConsulterPage, page);
    };

    useEffect(() => {
        listerPage();
    }, []);
    //
    return (
        <Bloc>
            <Tableau listeDonnee={listePage} siClicLigne={goToPageConsulterPage} texteAucunResultat="aucun.page">
                <Colonne nom="name" />
            </Tableau>
        </Bloc>
    );
};

export default TableauPage;