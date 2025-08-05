import { Form, Radio, Space } from 'antd';
import {useEffect} from 'react';

const ChampListeRadio = (props: any) => {

    const { form } = props;

    useEffect(() => {
        if (props.defaultValue) {
            form.setFieldsValue({ [props.attributes.name]: props.defaultValue });
        }
    }, []);

    const valueChanged = (v) => {
        if (props.attributes.onChange) {
            props.attributes.onChange(v.target?.value);
        }
    };

    return (
        <Form.Item {...props.attributes} onChange={valueChanged}>
            <Radio.Group defaultValue={props.defaultValue}>
                <Space direction={props.direction ? props.direction : 'horizontal'}>
                    {props.liste.map((l) => (
                        <Radio value={l.code} key={l.code}>
                            {l.libelle}
                        </Radio>
                    ))}
                </Space>
            </Radio.Group>
        </Form.Item>
    );
};

export default ChampListeRadio;
