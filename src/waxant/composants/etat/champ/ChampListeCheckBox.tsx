import { Checkbox, Form, Space } from 'antd';
import { useEffect } from 'react';

const ChampListeCheckBox = (props: any) => {

    const { form } = props;

    useEffect(() => {
        if (props.defaultValue) {
            form.setFieldsValue({ [props.attributes.name]: props.defaultValue });
        }
    }, []);



    return (
        <Form.Item {...props.attributes}  >
            <Checkbox.Group defaultValue={props.defaultValue}>
                <Space direction={props.direction ? props.direction : 'horizontal'}>
                    {props.liste.map((l) => (
                        <Checkbox value={l.id} key={l.id}>
                            {l.libelle}
                        </Checkbox>
                    ))}
                </Space>
            </Checkbox.Group>
        </Form.Item>
    );
};

export default ChampListeCheckBox;
