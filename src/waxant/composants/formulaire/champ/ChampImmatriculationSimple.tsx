import { Form } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import _ from 'lodash';
import { useContext, useEffect, useState } from 'react';
import util from '../../../noyau/util/util';
import FormulaireValidateur from '../FormulaireValidateur';

const ChampImmatriculationSimple = (props) => {
    const [value, setValue] = useState('');
    const { form, attributes } = props;
    const newValue = Form.useWatch(attributes.name, form);

    useEffect(() => {
        if (util.nonNul(newValue)) {
            setValue(newValue);
        } else {
            setValue('');
        }
    }, [newValue]);

    const changerValeur = (e) => {
        if (_.isArray(attributes.name)) {
            const v = {};
            const d = {};
            d[attributes.name[1]] = e.maskedValue;
            v[attributes.name[0]] = d;
            props.form.setFieldsValue(v);
        } else {
            const d = {};
            d[attributes.name] = e.maskedValue;
            props.form.setFieldsValue(d);
        }
    };

    const validateur = useContext(FormulaireValidateur);

    const getRules = () => {
        const n = _.isArray(attributes.name) ? _.join(attributes.name, '.') : attributes.name;
        if (attributes.requis || (validateur && validateur[n] && validateur[n].requis)) {
            return { required: true, message: attributes.label + ' est requis.', whitespace: true };
        }
        return { required: false };
    };

    return (
        <Form.Item key={props.attributes.cname} {...props.attributes} rules={[getRules]} style={{ ...props.attributes.style }}>
            <MaskedInput
                className={'champ-' + form.name + '-immatriculation'}
                value={value}
                onChange={changerValeur}
                mask="00000-a-00"
                placeholder="12345-A-12"
                maskOptions={{
                    lazy: false,
                    prepare: (str) => {
                        return str.toUpperCase();
                    },
                }}
            />
        </Form.Item>
    );
};

export default ChampImmatriculationSimple;
