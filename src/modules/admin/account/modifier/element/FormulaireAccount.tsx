import { Form } from 'antd';
import { ROLE_ADMIN, ROLE_ADMIN_ID, ROLE_GESTIONNAIRE_RH, ROLE_GESTIONNAIRE_RH_ID } from 'commun/securite/mapRole';
import { IUpdateAccountForm } from 'modele/admin/account/DomaineAccount';
import { useEffect } from 'react';
import { ActionUcRetourConsulter, Bloc, BlocAction, ChampListeRadio, ChampOuiNon, ChampTexte, Formulaire, useI18n } from 'waxant';
import { ActionAccount } from '../../ActionAccount';
import { PageConsulterAccount } from '../../ListePageAccount';
import useModifierAccount from '../useModifierAccount';
import ActionMajAccount from './ActionMajAccount';

const FormulaireAccount = () => {
    const { account, etatInitModificationAccount, initModificationAccount } = useModifierAccount();
    const { i18n } = useI18n();
    const [form] = Form.useForm<IUpdateAccountForm & { username: string }>();
    const listeRole = [
        { code: ROLE_GESTIONNAIRE_RH_ID, libelle: i18n(ROLE_GESTIONNAIRE_RH) },
        { code: ROLE_ADMIN_ID, libelle: i18n(ROLE_ADMIN) },
    ];

    useEffect(() => {
        initModificationAccount();
    }, []);

    useEffect(() => {
        if (etatInitModificationAccount.succes) {
            form.setFieldsValue({
                username: account?.username,
                role: account?.role.id,
                activated: account?.activated,
            });
        }
    }, [etatInitModificationAccount.succes]);
    //
    return (
        <Bloc largeur="600px" marge="20px" fond="blanc">
            <Formulaire form={form} nombreColonne={1}>
                <ChampTexte nom="username" requis="true" disabled />
                <ChampListeRadio nom="role" liste={listeRole} direction="vertical" requis="true" />
                <ChampOuiNon nom="activated" oui="Oui" non="Non" requis="true" />
            </Formulaire>
            <BlocAction>
                <ActionMajAccount form={form} />
                <ActionUcRetourConsulter nom={ActionAccount.UcModifierAccount.RETOUR_CONSULTER_ACCOUNT} page={PageConsulterAccount} />
            </BlocAction>
        </Bloc>
    );
};

export default FormulaireAccount;
