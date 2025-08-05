import { useEffect } from 'react';
import { ActionUcCreer, useGoToPage } from 'waxant';
import { ActionRh } from '../../../ActionRh';
import { PageConsulterDepartement } from '../../../ListePageRh';
import useCreerDepartement from '../useCreerDepartement';

const ActionCreerDepartement = ({ form }) => {
    const goToPage = useGoToPage();
    const { creerDepartement, etatCreerDepartement, idDepartement, resetEtatCreerDepartement } = useCreerDepartement();

    const creer = () => {
        creerDepartement({ form });
    };

    useEffect(() => {
        if (etatCreerDepartement.succes) {
            resetEtatCreerDepartement();
            goToPage(PageConsulterDepartement, { idDepartement });
        }
    }, [etatCreerDepartement.succes]);
    //
    return (
        <ActionUcCreer nom={ActionRh.UcCreerDepartement.CREER_DEPARTEMENT} action={creer} rid={etatCreerDepartement.rid} />
    );
};

export default ActionCreerDepartement;