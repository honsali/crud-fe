import { FormInstance } from 'antd';
import { IConge } from 'modele/rh/conge/DomaineConge';
import { useEffect } from 'react';
import { ActionUcCreer, useGoToPage } from 'waxant';
import { ActionEmploye } from '../../../ActionEmploye';
import { PageConsulterConge } from '../../../ListePageEmploye';
import useCreerConge from '../useCreerConge';

const ActionCreerConge = ({ form }: { form: FormInstance<IConge> }) => {
    const goToPage = useGoToPage();
    const { creerConge, etatCreerConge, idConge, resetEtatCreerConge } = useCreerConge();

    const creer = () => {
        creerConge(form);
    };

    useEffect(() => {
        if (etatCreerConge.succes) {
            resetEtatCreerConge();
            goToPage(PageConsulterConge, { idConge });
        }
    }, [etatCreerConge.succes]);
    //
    return (
        <ActionUcCreer nom={ActionEmploye.UcCreerConge.CREER_CONGE} action={creer} rid={etatCreerConge.rid} />
    );
};

export default ActionCreerConge;
