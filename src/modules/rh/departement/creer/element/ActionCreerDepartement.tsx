import { FormInstance } from 'antd';
import { ICreateDepartementForm } from 'modele/rh/departement/DomaineDepartement';
import { useEffect } from 'react';
import { ActionUcCreer, useGoToPage } from 'waxant';
import { ActionDepartement } from '../../ActionDepartement';
import { PageConsulterDepartement } from '../../ListePageDepartement';
import useCreerDepartement from '../useCreerDepartement';

const ActionCreerDepartement = ({ form }: { form: FormInstance<ICreateDepartementForm> }) => {
    const goToPage = useGoToPage();
    const { creerDepartement, etatCreerDepartement, idDepartement, resetEtatCreerDepartement } = useCreerDepartement();

    const creer = () => {
        void creerDepartement(form).catch(() => undefined);
    };

    useEffect(() => {
        if (etatCreerDepartement.succes) {
            resetEtatCreerDepartement();
            goToPage(PageConsulterDepartement, { idDepartement });
        }
    }, [etatCreerDepartement.succes]);
    //
    return (
        <ActionUcCreer nom={ActionDepartement.UcCreerDepartement.CREER_DEPARTEMENT} action={creer} rid={etatCreerDepartement.rid} />
    );
};

export default ActionCreerDepartement;
