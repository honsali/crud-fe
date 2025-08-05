import { Form, Radio } from 'antd';
import { useEffect } from 'react';
import useI18n from 'waxant/noyau/i18n/useI18n';

const OuiNon = (props: any) => {
    const { i18n } = useI18n();
    const { form, modele, attributes } = props;



    useEffect(() => {
        form.setFieldValue(attributes.name, '' + modele[attributes.name]);
    }, [form, modele, attributes]);



    return (
        <Form.Item   {...attributes} style={{ ...attributes.style }}>
            <Radio.Group >
                <Radio value="true" >
                    {props.oui ? props.oui : i18n('oui')}
                </Radio>
                <Radio value="false" >
                    {props.non ? props.non : i18n('non')}
                </Radio>
            </Radio.Group>
        </Form.Item>
    );
};

export default OuiNon;
