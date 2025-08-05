import { Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const ChampTexteLong = (props: any) => {

    return (
        <Form.Item {...props.attributes} style={{ ...props.attributes.style }}>
            <TextArea />
        </Form.Item>
    );
};

export default ChampTexteLong;
