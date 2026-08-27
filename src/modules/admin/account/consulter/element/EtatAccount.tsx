import { useEffect } from 'react';
import { FormulaireConsultation, OuiNon, Reference, Texte, useI18n } from 'waxant';
import useConsulterAccount from '../useConsulterAccount';

const EtatAccount = () => {
    const { i18n } = useI18n();
    const { account, recupererAccountParId } = useConsulterAccount();
    const modele = account?.role ? { ...account, role: i18n(account.role) } : account;

    useEffect(() => {
        recupererAccountParId();
    }, []);
    //
    return (
        <FormulaireConsultation modele={modele} nombreColonne={1}>
            <Texte nom="username" />
            <Reference nom="role" />
            <OuiNon nom="activated" oui="Oui" non="Non" />
        </FormulaireConsultation>
    );
};

export default EtatAccount;
