import { DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useContext, useEffect, useState } from 'react';
import useContexteApp from '../../../noyau/contexte/ContexteApp';
import FormulaireValidateur from '../FormulaireValidateur';

const ChampDate = (props: any) => {
    const { formatDate } = useContexteApp();
    const [localAttributes, setLocalAttributes] = useState({});
    const { form, attributes } = props;

    const newValue = Form.useWatch(attributes.name, form);

    useEffect(() => {
        const stringDate = newValue;
        const binaryDate = stringDate ? dayjs(stringDate, formatDate) : null;

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
        setLocalAttributes({ label: attributes.label, name: attributes.sname, lname: attributes.lname });

    }, [newValue]);

    const changerValeur = (binaryDate, stringDate) => {
        if (_.isArray(attributes.name)) {
            const v = {};
            const d = {};
            d[attributes.name[1]] = stringDate;
            v[attributes.name[0]] = d;
            form.setFieldsValue(v);
        } else {
            const d = {};
            d[attributes.name] = stringDate;
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
            <Form.Item {...localAttributes} rules={[getRules]}>
                <DatePicker
                    style={{ width: '100%' }}
                    format={{ format: formatDate, type: 'mask' }}
                    onChange={changerValeur}
                    disabledDate={props.intervalleDate}
                    disabled={props.attributes.disabled}
                />
            </Form.Item>

            <Form.Item name={attributes.name} noStyle>
                <Input style={{ display: 'none' }} />
            </Form.Item>
        </div>
    );
};

export default ChampDate;
