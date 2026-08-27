import { Form } from 'antd';
import { IResetPasswordRequest } from 'modele/admin/account/DomaineAccount';
import { ActionUcDialogue, ChampMotDePasse, ChampTexte, Formulaire, useContexteAuth, useI18n } from 'waxant';
import { ActionAccount } from '../../ActionAccount';
import useConsulterAccount from '../useConsulterAccount';

interface FormulaireMotDePasseAccount extends IResetPasswordRequest {
    username?: string;
}

const ActionReinitialiserMotDePasseAccount = () => {
    const {account, etatReinitialiserMotDePasseAccount, reinitialiserMotDePasseAccount, resetEtatReinitialiserMotDePasseAccount,     } = useConsulterAccount();
    const [form] = Form.useForm();
    const { logout, user } = useContexteAuth();
    const { i18n } = useI18n();

    const initialiser = () => {
        resetEtatReinitialiserMotDePasseAccount();
        form.setFieldsValue({
            username: account?.username,
            password: '',
        });
    };

    const reinitialiser = () => {
        reinitialiserMotDePasseAccount({ form });
    };

    const apresSucces = () => {
        resetEtatReinitialiserMotDePasseAccount();
        if (account?.username?.toLocaleLowerCase() === user?.toLocaleLowerCase()) {
            logout();
        }
    };

    useEffect(() => {
        if (etatReinitialiserMotDePasseAccount.succes) {
            resetEtatReinitialiserMotDePasseAccount();
        }
    }, [etatReinitialiserMotDePasseAccount.succes]);
    //
    return (
        <ActionUcDialogue
            nom={ActionAccount.UcConsulterAccount.REINITIALISER_MOT_DE_PASSE_ACCOUNT} //
            icone={<FontAwesomeIcon icon={faEdit} />}
            action={reinitialiser}
            form={form}
            etat={etatReinitialiserMotDePasseAccount}
            largeur={600}
            siInit={initialiser}
        >
            <Formulaire form={form} nombreColonne={1}>
                <ChampTexte nom="username" disabled/>
                <ChampMotDePasse libelle="Nouveau mot de passe" maxLength={256} minLength={8} nom="password" requis />
            </Formulaire>
        </ActionUcDialogue>
    );
};

export default ActionReinitialiserMotDePasseAccount;
