import { IAccount } from 'modele/admin/account/DomaineAccount';
import { Bloc, Colonne, Tableau, useGoToPage } from 'waxant';
import { PageConsulterAccount } from '../../ListePageAccount';
import { useListerAccount } from '../useListerAccount';

const TableauAccount = () => {
    const goToPage = useGoToPage();
    const { listeAccount } = useListerAccount();

    const goToPageConsulterAccount = (account: IAccount) => {
        goToPage(PageConsulterAccount, { idAccount: account.id });
    };

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
