import { Form } from 'antd';
import { ActionUcRetourListe, Bloc, BlocAction, ChampTexte, ChampTexteLong, Formulaire } from 'waxant';
import { ActionDepartement } from '../../ActionDepartement';
import { PageListerDepartement } from '../../ListePageDepartement';
import ActionCreerDepartement from './ActionCreerDepartement';

const FormulaireDepartement = () => {
    const [form] = Form.useForm();
    //
    return (
        <Bloc largeur="600px" marge="20px" fond="blanc">
            <Formulaire form={form} nombreColonne={1}>
                <ChampTexte nom="nom" requis="true" />
                <ChampTexteLong nom="description" />
            </Formulaire>
            <BlocAction>
                <ActionCreerDepartement form={form} />
                <ActionUcRetourListe nom={ActionDepartement.UcCreerDepartement.RETOUR_LISTE_DEPARTEMENT} page={PageListerDepartement} />
            </BlocAction>
        </Bloc>
    );
};

export default FormulaireDepartement;