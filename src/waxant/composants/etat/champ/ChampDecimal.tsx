import { Form, Input } from 'antd';

const ChampDecimal = (props: any) => {
    return (
        <Form.Item {...props.attributes}>
            <Input style={props.attributes.style} />
        </Form.Item>
    );
};

export default ChampDecimal;
