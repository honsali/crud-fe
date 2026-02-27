import { Form } from 'antd';
import { ActionUcRetourListe, Bloc, BlocAction, ChampDate, ChampReference, Formulaire } from 'waxant';
import { ActionEmploye } from '../../../ActionEmploye';
import { PageConsulterEmploye } from '../../../ListePageEmploye';
import ActionCreerConge from './ActionCreerConge';

const FormulaireConge = () => {
    const [form] = Form.useForm();
    //
    return (
        <Bloc largeur="600px" marge="20px" fond="blanc">
            <Formulaire form={form} nombreColonne={1}>
                <ChampReference nom="typeConge" />
                <ChampDate nom="dateDebutConge" />
                <ChampDate nom="dateFinConge" />
            </Formulaire>
            <BlocAction>
                <ActionCreerConge form={form} />
                <ActionUcRetourListe nom={ActionEmploye.UcCreerConge.RETOUR_LISTE_CONGE} page={PageConsulterEmploye} />
            </BlocAction>
        </Bloc>
    );
};

export default FormulaireConge;