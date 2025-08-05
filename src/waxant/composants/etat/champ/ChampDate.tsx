import { Form, Input } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import useContexteApp from '../../../noyau/contexte/ContexteApp';

const ChampDate = (props: any) => {
    const { formatDate } = useContexteApp();
    const { form, attributes } = props;

    useEffect(() => {
        const stringDate = form.getFieldValue(attributes.name);
        const formattedDate = stringDate ? dayjs(stringDate).format(formatDate) : null;
        form.setFieldsValue({ [attributes.name]: formattedDate });
    }, [form, attributes, formatDate]);


    return (
        <Form.Item  {...props.attributes} style={{ ...props.attributes.style }}>
            <Input />
        </Form.Item>
    );
};

export default ChampDate;
