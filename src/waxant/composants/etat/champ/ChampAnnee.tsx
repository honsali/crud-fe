import { DatePicker, Form } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import useContexteApp from '../../../noyau/contexte/ContexteApp';

const ChampAnnee = (props: any) => {
    const { formatDate } = useContexteApp();
    const { form, attributes } = props;

    useEffect(() => {
        if (form.__INTERNAL__.name) {
            const stringDate = form.getFieldValue(attributes.name);
            const d = {};
            d[attributes.sname] = stringDate ? dayjs('01/01/' + stringDate, formatDate) : null;
            form.setFieldsValue(d);
        }
    }, [form, attributes]);




    return (
        <Form.Item label={attributes.label} name={attributes.sname}  >
            <DatePicker
                style={{ width: '100%' }}
                disabledDate={props.intervalleDate} //
                disabled={props.attributes.disabled}
                picker="year"
            />
        </Form.Item>
    );
};

export default ChampAnnee;
