import { Form } from 'antd';
import { useEffect } from 'react';
import { ChampCache, ChampTexte, Formulaire } from 'waxant';
import useListerModule from '../useListerModule';

const FormulaireEntity = ({ node, endChange }) => {
    const { majEntity, etatMajEntity, resetEtatMajEntity } = useListerModule();
    const [form] = Form.useForm();

    const siChange = (value) => {
        if (node && value && value !== node?.title) {
            majEntity({ form });
        }
    };

    useEffect(() => {
        if (endChange && etatMajEntity.succes) {
            resetEtatMajEntity();
            form.resetFields();
            endChange();
        }
    }, [etatMajEntity.succes]);

    useEffect(() => {
        if (node) {
            form.setFieldsValue({ id: node.key?.substring(7), name: node.title, module: { id: node.parentId } });
        }
    }, [node]);
    //
    return (
        <Formulaire form={form}>
            <ChampTexte nom="name" libelle="vide" requis="true" siChange={siChange} />
            <ChampCache nom="id" />
            <ChampCache nom="module" />
        </Formulaire>
    );
};

export default FormulaireEntity;
