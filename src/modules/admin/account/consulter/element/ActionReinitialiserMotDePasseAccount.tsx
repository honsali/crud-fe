import { KeyOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { IResetPasswordRequest } from 'modele/admin/account/DomaineAccount';
import { ActionUcDialogue, ChampMotDePasse, ChampTexte, Formulaire, useContexteAuth } from 'waxant';
import { ActionAccount } from '../../ActionAccount';
import useConsulterAccount from '../useConsulterAccount';

interface FormulaireMotDePasseAccount extends IResetPasswordRequest {
    username?: string;
}

const ActionReinitialiserMotDePasseAccount = () => {
    const { account, etatReinitialiserMotDePasseAccount, reinitialiserMotDePasseAccount, resetEtatReinitialiserMotDePasseAccount } = useConsulterAccount();
    const [form] = Form.useForm<FormulaireMotDePasseAccount>();
    const { logout, user } = useContexteAuth();

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

    return (
        <ActionUcDialogue
            nom={ActionAccount.UcConsulterAccount.REINITIALISER_MOT_DE_PASSE_ACCOUNT} //
            icone={<KeyOutlined />}
            action={reinitialiser}
            form={form}
            etat={{
                rid: etatReinitialiserMotDePasseAccount.rid ?? null,
                success: etatReinitialiserMotDePasseAccount.succes,
                erreur: !!etatReinitialiserMotDePasseAccount.erreur,
            }}
            largeur={600}
            siInit={initialiser}
            siSucces={apresSucces}
        >
            <Formulaire form={form} nombreColonne={1}>
                <ChampTexte nom="username" disabled/>
                <ChampMotDePasse libelle="Nouveau mot de passe" maxLength={256} minLength={8} nom="password" requis />
            </Formulaire>
        </ActionUcDialogue>
    );
};

export default ActionReinitialiserMotDePasseAccount;
