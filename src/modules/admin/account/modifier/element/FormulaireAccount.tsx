import { Form } from 'antd';
import { ROLE_ADMIN, ROLE_GESTIONNAIRE_RH } from 'commun/securite/mapRole';
import { useEffect } from 'react';
import { ActionUcRetourConsulter, Bloc, BlocAction, ChampCache, ChampListeRadio, ChampOuiNon, ChampTexte, Formulaire, useI18n } from 'waxant';
import { ActionAccount } from '../../ActionAccount';
import { PageConsulterAccount } from '../../ListePageAccount';
import useModifierAccount from '../useModifierAccount';
import ActionMajAccount from './ActionMajAccount';

const FormulaireAccount = () => {
    const { account, etatInitModificationAccount, initModificationAccount } = useModifierAccount();
    const { i18n } = useI18n();
    const [form] = Form.useForm();
    const listeRole = [
        { code: ROLE_GESTIONNAIRE_RH, libelle: i18n(ROLE_GESTIONNAIRE_RH) },
        { code: ROLE_ADMIN, libelle: i18n(ROLE_ADMIN) },
    ];

    useEffect(() => {
        initModificationAccount();
    }, []);

    useEffect(() => {
        if (etatInitModificationAccount.succes) {
            form.setFieldsValue(account);
        }
    }, [etatInitModificationAccount.succes]);
    //
    return (
        <Bloc largeur="600px" marge="20px" fond="blanc">
            <Formulaire form={form} nombreColonne={1}>
                <ChampTexte nom="username" requis="true" disabled />
                <ChampListeRadio nom="role" liste={listeRole} direction="vertical" requis="true" />
                <ChampOuiNon nom="activated" oui="Oui" non="Non" requis="true" />
                <ChampCache nom="id" />
            </Formulaire>
            <BlocAction>
                <ActionMajAccount form={form} />
                <ActionUcRetourConsulter nom={ActionAccount.UcModifierAccount.RETOUR_CONSULTER_ACCOUNT} page={PageConsulterAccount} />
            </BlocAction>
        </Bloc>
    );
};

export default FormulaireAccount;
