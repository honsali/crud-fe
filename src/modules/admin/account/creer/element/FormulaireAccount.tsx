import { Form } from 'antd';
import { ROLE_ADMIN, ROLE_ADMIN_ID, ROLE_GESTIONNAIRE_RH, ROLE_GESTIONNAIRE_RH_ID } from 'commun/securite/mapRole';
import { ICreateAccountForm } from 'modele/admin/account/DomaineAccount';
import { useEffect } from 'react';
import { ActionUcRetourListe, Bloc, BlocAction, ChampListeRadio, ChampMotDePasse, ChampTexte, Formulaire, useI18n } from 'waxant';
import { ActionAccount } from '../../ActionAccount';
import { PageListerAccount } from '../../ListePageAccount';
import ActionCreerAccount from './ActionCreerAccount';

const FormulaireAccount = () => {
    const [form] = Form.useForm<ICreateAccountForm>();
    const { i18n } = useI18n();
    const listeRole = [
        { code: ROLE_GESTIONNAIRE_RH_ID, libelle: i18n(ROLE_GESTIONNAIRE_RH) },
        { code: ROLE_ADMIN_ID, libelle: i18n(ROLE_ADMIN) },
    ];

    useEffect(() => {
        form.setFieldValue('role', ROLE_GESTIONNAIRE_RH_ID);
    }, [form]);

    return (
        <Bloc largeur="600px" marge="20px" fond="blanc">
            <Formulaire form={form} nombreColonne={1}>
                <ChampTexte nom="username" requis="true" />
                <ChampMotDePasse libelle="Mot de passe initial" maxLength={256} minLength={8} nom="password" requis />
                <ChampListeRadio nom="role" liste={listeRole} direction="vertical" requis="true" />
            </Formulaire>
            <BlocAction>
                <ActionCreerAccount form={form} />
                <ActionUcRetourListe nom={ActionAccount.UcCreerAccount.RETOUR_LISTE_ACCOUNT} page={PageListerAccount} />
            </BlocAction>
        </Bloc>
    );
};

export default FormulaireAccount;
