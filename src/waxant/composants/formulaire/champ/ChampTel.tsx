import { Form, Input } from 'antd';
import _ from 'lodash';
import { useContext } from 'react';
import FormulaireValidateur from '../FormulaireValidateur';

const ChampTel = (props) => {
    const validateur = useContext(FormulaireValidateur);
    const { form, attributes } = props;

    const getRules = () => {
        const n = _.isArray(props.attributes.name) ? _.join(props.attributes.name, '.') : props.attributes.name;
        if (props.attributes.requis || (validateur && validateur[n] && validateur[n].requis)) {
            return { required: true, message: props.attributes.label + ' est requis.', whitespace: true };
        }
        return { required: false };
    };

    const onChangeValue = (event) => {
        const { value } = event.target;
        const formattedValue = formatPhoneNumber(value);
        form.setFieldValue(attributes.name, formattedValue);
    };

    const formatPhoneNumber = (value) => {
        // Remove all non-digit characters
        let digits = value.replace(/\D/g, '');

        // limit number of digits to 10, example: 0666 66 66 66 => 10
        if (digits.length > 10) {
            digits = digits.substring(0, 10);
        }

        // Format digits according to the desired pattern
        const phoneNumber = digits.replace(/^(\d{0,4})(\d{0,2})(\d{0,2})(\d{0,2})$/, (match, p1, p2, p3, p4) => {
            if (p4) {
                return `${p1} ${p2} ${p3} ${p4}`;
            } else if (p3) {
                return `${p1} ${p2} ${p3}`;
            } else if (p2) {
                return `${p1} ${p2}`;
            } else if (p1) {
                return `${p1}`;
            }
            return '';
        });

        return phoneNumber;
    };

    return (
        <Form.Item key={props.attributes.cname} {...props.attributes} rules={[getRules]} style={{ ...props.attributes.style }}>
            <Input
                className={'champ-' + props.attributes.cls}
                disabled={props.attributes.disabled}
                placeholder="0666 66 66 66"
                onChange={onChangeValue}
                addonAfter={props.addonAfter}
            />
        </Form.Item>
    );
};

export default ChampTel;
