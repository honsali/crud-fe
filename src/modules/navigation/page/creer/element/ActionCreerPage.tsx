import { useEffect } from 'react';
import { ActionUcCreer, useGoToPage } from 'waxant';
import { ActionPage } from '../../ActionPage';
import { PageConsulterPage } from '../../ListePagePage';
import useCreerPage from '../useCreerPage';

const ActionCreerPage = ({ form }) => {
    const goToPage = useGoToPage();
    const { creerPage, etatCreerPage, idPage, resetEtatCreerPage } = useCreerPage();

    const creer = () => {
        creerPage({ form });
    };

    useEffect(() => {
        if (etatCreerPage.succes) {
            resetEtatCreerPage();
            goToPage(PageConsulterPage, { idPage });
        }
    }, [etatCreerPage.succes]);
    //
    return (
        <ActionUcCreer nom={ActionPage.UcCreerPage.CREER_PAGE} action={creer} rid={etatCreerPage.rid} />
    );
};

export default ActionCreerPage;