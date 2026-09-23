import { IAccount } from 'modele/admin/account/DomaineAccount';
import { useEffect } from 'react';
import { Bloc, Colonne, Tableau, useGoToPage } from 'waxant';
import { PageConsulterAccount } from '../../ListePageAccount';
import useListerAccount from '../useListerAccount';

const TableauAccount = () => {
    const goToPage = useGoToPage();
    const { listeAccount, listerAccount } = useListerAccount();

    const goToPageConsulterAccount = (account: IAccount) => {
        goToPage(PageConsulterAccount, { idAccount: account.id });
    };

    useEffect(() => {
        listerAccount();
    }, []);
    //
    return (
        <Bloc>
            <Tableau listeDonnee={listeAccount} siClicLigne={goToPageConsulterAccount} texteAucunResultat="aucun.account">
                <Colonne nom="username" />
                <Colonne tc="reference" nom="role" />
                <Colonne tc="ouiNon" nom="activated" />
            </Tableau>
        </Bloc>
    );
};

export default TableauAccount;
