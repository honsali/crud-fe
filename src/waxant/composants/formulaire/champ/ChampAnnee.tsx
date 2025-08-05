import { DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useContext, useEffect } from 'react';
import useContexteApp from '../../../noyau/contexte/ContexteApp';
import FormulaireValidateur from '../FormulaireValidateur';

const ChampAnnee = (props: any) => {
    const { formatDate } = useContexteApp();
    const { form, attributes } = props;

    useEffect(() => {
        if (form.__INTERNAL__.name) {
            const stringDate = form.getFieldValue(attributes.name);
            const binaryDate = stringDate ? dayjs('01/01/' + stringDate, formatDate) : null;
            if (_.isArray(attributes.name)) {
                const v = {};
                const d = {};
                d[attributes.sname[1]] = binaryDate;
                v[attributes.name[0]] = d;
                form.setFieldsValue(v);
            } else {
                const d = {};
                d[attributes.sname] = binaryDate;
                form.setFieldsValue(d);
            }
        }
    }, [form, attributes]);

    const changeValue = (binaryDate, stringDate) => {
        if (_.isArray(attributes.name)) {
            const v = {};
            const d = {};
            d[attributes.name[1]] = stringDate;
            // d[attributes.sname[1]] = binaryDate;
            v[attributes.name[0]] = d;
            form.setFieldsValue(v);
        } else {
            const d = {};
            d[attributes.name] = stringDate;
            // d[attributes.sname] = binaryDate;
            form.setFieldsValue(d);
        }

        if (attributes.onChange) {
            attributes.onChange(stringDate);
        }
    };
    const validateur = useContext(FormulaireValidateur);

    const getRules = () => {
        const n = _.isArray(attributes.name) ? _.join(attributes.name, '.') : attributes.name;
        if (attributes.requis || (validateur && validateur[n] && validateur[n].requis)) {
            return { required: true, message: attributes.label + ' est requis.' };
        }
        return { required: false };
    };
    return (
        <div>
            <Form.Item label={attributes.label} name={attributes.sname} rules={[getRules]}>
                <DatePicker
                    style={{ width: '100%' }}
                    onChange={changeValue}
                    disabledDate={props.intervalleDate} //
                    disabled={props.attributes.disabled}
                    picker="year"
                />
            </Form.Item>

            <Form.Item name={attributes.name} noStyle>
                <Input style={{ display: 'none' }} />
            </Form.Item>
        </div>
    );
};

export default ChampAnnee;
