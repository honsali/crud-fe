import { Form } from 'antd';
import { useEffect } from 'react';
import { ChampCache, ChampTexte, DialogueConfirmation, Formulaire } from 'waxant';
import useListerMenu from '../useListerMenu';

const DialogueModifierMenu = ({ visible, setVisible, menu }) => {
    const { majMenu } = useListerMenu();
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible && menu?.id) {
            form.setFieldsValue(menu);
        }
    }, [visible, menu]);

    const enregistrer = () => {
        majMenu({ form });
    };

    const annuler = () => {
        form.resetFields();
        setVisible(false);
    };
    //
    return (
        <DialogueConfirmation visible={visible} nom="modifierMenu" actionAnnuler={annuler} actionConfirmer={enregistrer}>
            <Formulaire form={form}>
                <ChampTexte nom="label" requis="true" />
                <ChampTexte nom="icon" />
                <ChampCache nom="name" />
                <ChampCache nom="menu" />
                <ChampCache nom="id" />
            </Formulaire>
        </DialogueConfirmation>
    );
};

export default DialogueModifierMenu;