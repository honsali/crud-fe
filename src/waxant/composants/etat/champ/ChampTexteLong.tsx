import { Form, Input } from 'antd';

const { TextArea } = Input;

const ChampTexteLong = (props: any) => {

    return (
        <Form.Item {...props.attributes} style={{ ...props.attributes.style }}>
            <TextArea />
        </Form.Item>
    );
};

export default ChampTexteLong;
