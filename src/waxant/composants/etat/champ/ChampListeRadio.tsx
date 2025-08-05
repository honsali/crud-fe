import { Form, Radio, Space } from 'antd';
import { useEffect } from 'react';

const ChampListeRadio = (props: any) => {

    const { form } = props;

    useEffect(() => {
        if (props.defaultValue) {
            form.setFieldsValue({ [props.attributes.name]: props.defaultValue });
        }
    }, []);



    return (
        <Form.Item {...props.attributes}  >
            <Radio.Group defaultValue={props.defaultValue}>
                <Space direction={props.direction ? props.direction : 'horizontal'}>
                    {props.liste.map((l) => (
                        <Radio value={l.id} key={l.id}>
                            {l.libelle}
                        </Radio>
                    ))}
                </Space>
            </Radio.Group>
        </Form.Item>
    );
};

export default ChampListeRadio;
