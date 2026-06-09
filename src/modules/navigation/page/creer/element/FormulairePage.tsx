import { Form } from 'antd';
import { ActionUcRetourListe, Bloc, BlocAction, ChampTexte, Formulaire } from 'waxant';
import { ActionPage } from '../../ActionPage';
import { PageListerPage } from '../../ListePagePage';
import ActionCreerPage from './ActionCreerPage';

const FormulairePage = () => {
    const [form] = Form.useForm();
    //
    return (
        <Bloc largeur="600px" marge="20px" fond="blanc">
            <Formulaire form={form} nombreColonne={1}>
                <ChampTexte nom="name" requis="true" />
            </Formulaire>
            <BlocAction>
                <ActionCreerPage form={form} />
                <ActionUcRetourListe nom={ActionPage.UcCreerPage.RETOUR_LISTE_PAGE} page={PageListerPage} />
            </BlocAction>
        </Bloc>
    );
};

export default FormulairePage;