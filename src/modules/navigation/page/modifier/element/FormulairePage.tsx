import { Form } from 'antd';
import { useEffect } from 'react';
import { ActionUcRetourConsulter, Bloc, BlocAction, ChampCache, ChampTexte, Formulaire } from 'waxant';
import { ActionPage } from '../../ActionPage';
import { PageConsulterPage } from '../../ListePagePage';
import useModifierPage from '../useModifierPage';
import ActionMajPage from './ActionMajPage';

const FormulairePage = () => {
    const { etatInitModificationPage, initModificationPage, page } = useModifierPage();
    const [form] = Form.useForm();

    useEffect(() => {
        initModificationPage();
    }, []);

    useEffect(() => {
        if (etatInitModificationPage.succes) {
            form.setFieldsValue(page);
        }
    }, [etatInitModificationPage.succes]);
    //
    return (
        <Bloc largeur="600px" marge="20px" fond="blanc">
            <Formulaire form={form} nombreColonne={1}>
                <ChampTexte nom="name" requis="true" />
                <ChampCache nom="id" />
            </Formulaire>
            <BlocAction>
                <ActionMajPage form={form} />
                <ActionUcRetourConsulter nom={ActionPage.UcModifierPage.RETOUR_CONSULTER_PAGE} page={PageConsulterPage} />
            </BlocAction>
        </Bloc>
    );
};

export default FormulairePage;