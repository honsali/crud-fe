import { Form } from 'antd';
import { useEffect } from 'react';
import { ChampCache, ChampTexte, Formulaire } from 'waxant';
import useListerModule from '../useListerModule';

const FormulaireModule = ({ node, endChange }) => {
    const { majModule, etatMajModule, resetEtatMajModule } = useListerModule();
    const [form] = Form.useForm();

    const siChange = (value) => {
        if (node && value && value !== node?.title) {
            majModule({ form });
        }
    };

    useEffect(() => {
        if (endChange && etatMajModule.succes) {
            resetEtatMajModule();
            form.resetFields();
            endChange();
        }
    }, [etatMajModule.succes]);

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

export default FormulaireModule;