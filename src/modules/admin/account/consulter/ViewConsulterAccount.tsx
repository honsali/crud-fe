import { ActionUcModifier, ActionUcRetourListe, Bloc, BlocAction, Section, useContexteAuth, useI18n } from 'waxant';
import { ActionAccount } from '../ActionAccount';
import { PageListerAccount, PageModifierAccount } from '../ListePageAccount';
import ActionReinitialiserMotDePasseAccount from './element/ActionReinitialiserMotDePasseAccount';
import EtatAccount from './element/EtatAccount';
import useConsulterAccount from './useConsulterAccount';

const ViewConsulterAccount = () => {
    const { user } = useContexteAuth();
    const { i18n } = useI18n();
    const { account } = useConsulterAccount();
    const compteCourant = !!account?.username && account.username.toLocaleLowerCase() === user?.toLocaleLowerCase();
    //
    return (
        <Section>
            <Bloc largeur="600px" marge="20px" fond="blanc">
                <EtatAccount />
                <BlocAction>
                    {!compteCourant && <ActionUcModifier nom={ActionAccount.UcConsulterAccount.MODIFIER_ACCOUNT} page={PageModifierAccount} />}
                   {account?.id &&  <ActionReinitialiserMotDePasseAccount />}
                    <ActionUcRetourListe nom={ActionAccount.UcConsulterAccount.RETOUR_LISTE_ACCOUNT} page={PageListerAccount} />
                </BlocAction>
            </Bloc>
        </Section>
    );
};

export default ViewConsulterAccount;
