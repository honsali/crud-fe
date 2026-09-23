import { useEffect } from 'react';
import { FormulaireConsultation, OuiNon, Reference, Texte } from 'waxant';
import useConsulterAccount from '../useConsulterAccount';

const EtatAccount = () => {
    const { account, recupererAccountParId } = useConsulterAccount();

    useEffect(() => {
        recupererAccountParId();
    }, []);
    //
    return (
        <FormulaireConsultation modele={account} nombreColonne={1}>
            <Texte nom="username" />
            <Reference nom="role" />
            <OuiNon nom="activated" oui="Oui" non="Non" />
        </FormulaireConsultation>
    );
};

export default EtatAccount;
