import { useEffect } from 'react';
import { ActionUcCreer, useGoToPage } from 'waxant';
import { ActionEmploye } from '../../ActionEmploye';
import { PageConsulterEmploye } from '../../ListePageEmploye';
import useCreerEmploye from '../useCreerEmploye';

const ActionCreerEmploye = ({ form }) => {
    const goToPage = useGoToPage();
    const { creerEmploye, etatCreerEmploye, idEmploye, resetEtatCreerEmploye } = useCreerEmploye();

    const creer = () => {
        creerEmploye({ form });
    };

    useEffect(() => {
        if (etatCreerEmploye.succes) {
            resetEtatCreerEmploye();
            goToPage(PageConsulterEmploye, { idEmploye });
        }
    }, [etatCreerEmploye.succes]);
    //
    return (
        <ActionUcCreer nom={ActionEmploye.UcCreerEmploye.CREER_EMPLOYE} action={creer} rid={etatCreerEmploye.rid} />
    );
};

export default ActionCreerEmploye;