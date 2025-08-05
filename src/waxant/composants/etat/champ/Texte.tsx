import { Form, Input } from 'antd';
import { useEffect } from 'react';

const Texte = (props) => {
    const { form, modele, attributes } = props;



    useEffect(() => {
        form.setFieldValue(attributes.name, modele[attributes.name]);
    }, [form, modele, attributes]);



    return (
        <Form.Item  {...attributes} style={{ ...attributes.style }}>
            <Input />
        </Form.Item>
    );
};

export default Texte;
