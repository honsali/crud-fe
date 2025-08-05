import { useEffect } from 'react';
import { ActionUcEnregistrer, useGoToPage } from 'waxant';
import { ActionRh } from '../../../ActionRh';
import { PageConsulterDepartement } from '../../../ListePageRh';
import useModifierDepartement from '../useModifierDepartement';

const ActionEnregistrerDepartement = ({ form }) => {
    const goToPage = useGoToPage();
    const { enregistrerDepartement, etatEnregistrerDepartement, resetEtatEnregistrerDepartement } = useModifierDepartement();

    const enregistrer = () => {
        enregistrerDepartement({ form });
    };

    useEffect(() => {
        if (etatEnregistrerDepartement.succes) {
            resetEtatEnregistrerDepartement();
            goToPage(PageConsulterDepartement);
        }
    }, [etatEnregistrerDepartement.succes]);
    //
    return (
        <ActionUcEnregistrer nom={ActionRh.UcModifierDepartement.ENREGISTRER_DEPARTEMENT} action={enregistrer} rid={etatEnregistrerDepartement.rid} />
    );
};

export default ActionEnregistrerDepartement;