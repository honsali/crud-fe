import { useEffect } from 'react';
import { ActionUcMaj, useGoToPage } from 'waxant';
import { ActionPage } from '../../ActionPage';
import { PageConsulterPage } from '../../ListePagePage';
import useModifierPage from '../useModifierPage';

const ActionMajPage = ({ form }) => {
    const goToPage = useGoToPage();
    const { etatMajPage, majPage, resetEtatMajPage } = useModifierPage();

    const maj = () => {
        majPage({ form });
    };

    useEffect(() => {
        if (etatMajPage.succes) {
            resetEtatMajPage();
            goToPage(PageConsulterPage);
        }
    }, [etatMajPage.succes]);
    //
    return (
        <ActionUcMaj nom={ActionPage.UcModifierPage.MAJ_PAGE} action={maj} rid={etatMajPage.rid} />
    );
};

export default ActionMajPage;