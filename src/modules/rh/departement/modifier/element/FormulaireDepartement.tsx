import { Form } from 'antd';
import { useEffect } from 'react';
import { ActionUcRetourConsulter, Bloc, BlocAction, ChampCache, ChampTexte, ChampTexteLong, Formulaire } from 'waxant';
import { ActionRh } from '../../../ActionRh';
import { PageConsulterDepartement } from '../../../ListePageRh';
import useModifierDepartement from '../useModifierDepartement';
import ActionEnregistrerDepartement from './ActionEnregistrerDepartement';

const FormulaireDepartement = () => {
    const { departement, etatInitModificationDepartement, initModificationDepartement } = useModifierDepartement();
    const [form] = Form.useForm();

    useEffect(() => {
        initModificationDepartement();
    }, []);

    useEffect(() => {
        if (etatInitModificationDepartement.succes) {
            form.setFieldsValue(departement);
        }
    }, [etatInitModificationDepartement.succes]);
    //
    return (
        <Bloc largeur="600px" marge="20px" fond="blanc">
            <Formulaire form={form}  >
                <ChampTexte nom="nom" />
                <ChampTexteLong nom="description" />
                <ChampCache nom="id" />
            </Formulaire>
            <BlocAction>
                <ActionEnregistrerDepartement form={form} />
                <ActionUcRetourConsulter nom={ActionRh.UcModifierDepartement.RETOUR_CONSULTER_DEPARTEMENT} page={PageConsulterDepartement} />
            </BlocAction>
        </Bloc>
    );
};

export default FormulaireDepartement;