import { Form, Input } from 'antd';
import { useEffect } from 'react';

const Reference = (props) => {
    const { form, modele, attributes } = props;

    useEffect(() => {
        if (modele[attributes.name]) {
            form.setFieldValue(attributes.name, modele[attributes.name]['libelle']);
        } else {
            form.setFieldValue(attributes.name, null);
        }
    }, [form, modele, attributes]);


    return (
        <Form.Item  {...attributes} style={{ ...attributes.style }}>
            <Input />
        </Form.Item>
    );
};

export default Reference;
