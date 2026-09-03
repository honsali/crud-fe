import { Form, Input } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import useContexteApp from '../../../noyau/contexte/ContexteApp';

const ChampDate = (props: any) => {
    const { formatDate } = useContexteApp();
    const { form, modele, attributes } = props;

    useEffect(() => {
        const stringDate = modele?.[attributes.name];
        const date = stringDate ? dayjs(stringDate) : null;
        const formattedDate = date?.isValid() ? date.format(formatDate) : null;
        form.setFieldsValue({ [attributes.name]: formattedDate });
    }, [form, modele, attributes, formatDate]);


    return (
        <Form.Item  {...props.attributes} style={{ ...props.attributes.style }}>
            <Input />
        </Form.Item>
    );
};

export default ChampDate;
