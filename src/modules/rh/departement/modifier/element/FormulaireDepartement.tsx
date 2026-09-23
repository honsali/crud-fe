import { Form } from 'antd';
import { IDepartement } from 'modele/rh/departement/DomaineDepartement';
import { useEffect } from 'react';
import { ActionUcRetourConsulter, Bloc, BlocAction, ChampCache, ChampTexte, ChampTexteLong, Formulaire } from 'waxant';
import { ActionDepartement } from '../../ActionDepartement';
import { PageConsulterDepartement } from '../../ListePageDepartement';
import { useInitModificationDepartement } from '../useModifierDepartement';
import ActionMajDepartement from './ActionMajDepartement';

const FormulaireDepartement = () => {
    const [form] = Form.useForm<IDepartement>();
    const { departement, etatInitModificationDepartement } = useInitModificationDepartement();

    useEffect(() => {
        if (etatInitModificationDepartement.succes && departement) {
            form.setFieldsValue(departement);
        }
    }, [etatInitModificationDepartement.succes, departement, form]);
    //
    return (
        <Bloc largeur="600px" marge="20px" fond="blanc">
            <Formulaire form={form} nombreColonne={1}>
                <ChampTexte nom="nom" requis="true" />
                <ChampTexteLong nom="description" />
                <ChampCache nom="id" />
                <ChampCache nom="version" />
            </Formulaire>
            <BlocAction>
                <ActionMajDepartement form={form} />
                <ActionUcRetourConsulter nom={ActionDepartement.UcModifierDepartement.RETOUR_CONSULTER_DEPARTEMENT} page={PageConsulterDepartement} />
            </BlocAction>
        </Bloc>
    );
};

export default FormulaireDepartement;
