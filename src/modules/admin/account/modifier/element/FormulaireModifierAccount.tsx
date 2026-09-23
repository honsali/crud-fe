import { Form } from 'antd';
import { ROLE_ADMIN, ROLE_ADMIN_ID, ROLE_GESTIONNAIRE_RH, ROLE_GESTIONNAIRE_RH_ID } from 'commun/securite/mapRole';
import { IUpdateAccountForm } from 'modele/admin/account/DomaineAccount';
import { useEffect } from 'react';
import { ActionUcRetourConsulter, Bloc, BlocAction, ChampCache, ChampListeRadio, ChampOuiNon, Formulaire, FormulaireConsultation, Texte, useI18n } from 'waxant';
import { ActionAccount } from '../../ActionAccount';
import { PageConsulterAccount } from '../../ListePageAccount';
import useModifierAccount from '../useModifierAccount';
import ActionMajAccount from './ActionMajAccount';

const FormulaireModifierAccount = () => {
    const { account, etatInitModificationAccount, initModificationAccount } = useModifierAccount();
    const { i18n } = useI18n();
    const [form] = Form.useForm<IUpdateAccountForm>();
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
                role: account?.role.id,
                activated: account?.activated,
                version: account?.version,
            });
        }
    }, [etatInitModificationAccount.succes]);
    //
    return (
        <Bloc largeur="600px" marge="20px" fond="blanc">
            <FormulaireConsultation modele={account}>
                <Texte nom="username" />
            </FormulaireConsultation>
            <Formulaire form={form} nombreColonne={1}>
                <ChampListeRadio nom="role" liste={listeRole} direction="vertical" requis="true" />
                <ChampOuiNon nom="activated" oui="Oui" non="Non" requis="true" />
                <ChampCache nom="version" />
            </Formulaire>
            <BlocAction>
                <ActionMajAccount form={form} />
                <ActionUcRetourConsulter nom={ActionAccount.UcModifierAccount.RETOUR_CONSULTER_ACCOUNT} page={PageConsulterAccount} />
            </BlocAction>
        </Bloc>
    );
};

export default FormulaireModifierAccount;
