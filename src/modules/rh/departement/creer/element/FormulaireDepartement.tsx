import { Form } from 'antd';
import { ActionUcRetourListe, Bloc, BlocAction, ChampTexte, ChampTexteLong, Formulaire } from 'waxant';
import { ActionRh } from '../../../ActionRh';
import { PageListerDepartement } from '../../../ListePageRh';
import ActionCreerDepartement from './ActionCreerDepartement';

const FormulaireDepartement = () => {
    const [form] = Form.useForm();
    //
    return (
        <Bloc largeur="600px" marge="20px" fond="blanc">
            < Formulaire form={form} >
                <ChampTexte nom="nom" />
                <ChampTexteLong nom="description" />
            </Formulaire >
            <BlocAction>
                <ActionCreerDepartement form={form} />
                <ActionUcRetourListe nom={ActionRh.UcCreerDepartement.RETOUR_LISTE_DEPARTEMENT} page={PageListerDepartement} />
            </BlocAction>
        </Bloc >
    );
};

export default FormulaireDepartement;