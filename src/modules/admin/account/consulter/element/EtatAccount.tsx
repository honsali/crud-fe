import { FormulaireConsultation, OuiNon, Reference, Texte } from 'waxant';
import { useRecupererAccountParId } from '../useConsulterAccount';

const EtatAccount = () => {
    const { account } = useRecupererAccountParId();
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
