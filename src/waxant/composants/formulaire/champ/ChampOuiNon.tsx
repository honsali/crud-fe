import { Form, Input, Radio } from 'antd';
import _ from 'lodash';
import { useContext, useEffect } from 'react';
import FormulaireValidateur from '../FormulaireValidateur';

const ChampOuiNon = (props: any) => {
    const { form, attributes } = props;
    const validateur = useContext(FormulaireValidateur);
    useEffect(() => {
        const booleanValue = form.getFieldValue(attributes.name);
        const stringValue = '' + booleanValue;

        if (_.isArray(attributes.name)) {
            const v = {};
            const d = {};
            d[attributes.sname[1]] = stringValue;
            v[attributes.name[0]] = d;
            form.setFieldsValue(v);
        } else {
            const d = {};
            d[attributes.sname] = stringValue;
            form.setFieldsValue(d);
        }
    }, [form, attributes]);

    const valueChanged = (v) => {
        const stringValue = v.target?.value;
        const booleanValue = stringValue === 'true' ? true : stringValue === 'false' ? false : null;

        if (_.isArray(attributes.name)) {
            const v = {};
            const d = {};
            d[attributes.name[1]] = booleanValue;
            v[attributes.name[0]] = d;
            form.setFieldsValue(v);
        } else {
            const d = {};
            d[attributes.name] = booleanValue;
            form.setFieldsValue(d);
        }

        if (attributes.onChange) {
            attributes.onChange(booleanValue);
        }
    };
    const getRules = () => {
        const n = _.isArray(props.attributes.name) ? _.join(props.attributes.name, '.') : props.attributes.name;
        if (props.attributes.requis || (validateur && validateur[n] && validateur[n].requis)) {
            return { required: true, message: props.attributes.label + ' est requis.', whitespace: true };
        }
        return { required: false };
    };

    return (
        <div>
            <Form.Item label={attributes.label} name={attributes.sname} rules={[getRules]} style={{ ...props.attributes.style }}>
                <Radio.Group onChange={valueChanged}>
                    <Radio value="true" disabled={attributes.disabled}>
                        {props.oui ? props.oui : 'Oui'}
                    </Radio>
                    <Radio value="false" disabled={attributes.disabled}>
                        {props.non ? props.non : 'Non'}
                    </Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name={attributes.name} noStyle>
                <Input style={{ display: 'none' }} />
            </Form.Item>
        </div>
    );
};

export default ChampOuiNon;
