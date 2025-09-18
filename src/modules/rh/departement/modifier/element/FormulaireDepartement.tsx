import { Form } from 'antd';
import { useEffect } from 'react';
import { ActionUcRetourConsulter, Bloc, BlocAction, ChampCache, ChampTexte, ChampTexteLong, Formulaire } from 'waxant';
import { ActionDepartement } from '../../ActionDepartement';
import { PageConsulterDepartement } from '../../ListePageDepartement';
import useModifierDepartement from '../useModifierDepartement';
import ActionMajDepartement from './ActionMajDepartement';

const FormulaireDepartement = () => {
    const { departement, etatRecupererDepartementParId, recupererDepartementParId } = useModifierDepartement();
    const [form] = Form.useForm();

    useEffect(() => {
        recupererDepartementParId();
    }, []);

    useEffect(() => {
        if (etatRecupererDepartementParId.succes) {
            form.setFieldsValue(departement);
        }
    }, [etatRecupererDepartementParId.succes]);
    //
    return (
        <Bloc largeur="600px" marge="20px" fond="blanc">
            <Formulaire form={form}>
                <ChampTexte nom="nom" requis="true" />
                <ChampTexteLong nom="description" />
                <ChampCache nom="id" />
            </Formulaire>
            <BlocAction>
                <ActionMajDepartement form={form} />
                <ActionUcRetourConsulter nom={ActionDepartement.UcModifierDepartement.RETOUR_CONSULTER_DEPARTEMENT} page={PageConsulterDepartement} />
            </BlocAction>
        </Bloc>
    );
};

export default FormulaireDepartement;