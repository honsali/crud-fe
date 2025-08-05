import { Form, InputNumber } from 'antd';

const ChampNumerique = (props) => {

    return (
        <Form.Item {...props.attributes}  >
            <InputNumber
                style={{ ...props.attributes.style, width: '100%' }}
                controls={false}
                precision={0} />
        </Form.Item>
    );
};

export default ChampNumerique;
