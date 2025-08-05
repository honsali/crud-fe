import { Form, Input } from 'antd';

const ChampCache = (props) => {
    return (
        <Form.Item {...props.attributes} noStyle>
            <Input style={{ display: 'none' }} />
        </Form.Item>
    );
};

export default ChampCache;
