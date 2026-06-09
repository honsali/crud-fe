import { Form } from 'antd';
import type { IEntity } from 'modele/modelisation/entity/DomaineEntity';
import { useEffect, useState } from 'react';
import { Bloc, ChampCache, ChampTexte, DialogueInformation, Formulaire } from 'waxant';
import useListerModule from '../useListerModule';
import TableauField from './TableauField';

const DialogueModifierEntity = ({ visible, setVisible, node }) => {
    const { listeEntity, majEntity } = useListerModule();
    const [form] = Form.useForm();
    const [entity, setEntity] = useState(null);

    useEffect(() => {
        if (visible && node?.key) {
            const entityId = node.key.substring(7);
            const x: IEntity = listeEntity?.find((e) => ('' + e.id === entityId));
            setEntity(x);
            form.setFieldsValue(x);
        }
    }, [visible, node]);

    const siChange = () => {
        majEntity({ form });
    };

    const annuler = () => {
        form.resetFields();
        setVisible(false);
    };
    //
    return (
        <DialogueInformation visible={visible} nom="modifierEntity" actionAnnuler={annuler} >
            <Bloc largeur="300px">
                <Formulaire form={form}>
                    <ChampTexte nom="name" requis="true" siChange={siChange} />
                    <ChampCache nom="module" />
                    <ChampCache nom="id" />
                </Formulaire>
            </Bloc>
            <TableauField entity={entity} />
        </DialogueInformation>
    );
};

export default DialogueModifierEntity;