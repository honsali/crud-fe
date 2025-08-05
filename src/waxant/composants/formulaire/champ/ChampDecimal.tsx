import { Form, InputNumber } from 'antd';
import _ from 'lodash';
import { useContext } from 'react';
import FormulaireValidateur from '../FormulaireValidateur';

const ChampDecimal = (props: any) => {
    const validateur = useContext(FormulaireValidateur);

    const getRules = () => {
        const n = _.isArray(props.attributes.name) ? _.join(props.attributes.name, '.') : props.attributes.name;
        if (props.attributes.requis || (validateur && validateur[n] && validateur[n].requis)) {
            return { required: true, message: props.attributes.label + ' est requis.', type: 'number' };
        }
        return { required: false };
    };

    const valueChanged = (a) => {
        if (props.attributes.onChange) {
            props.attributes.onChange(a);
        }
    };
    return (
        <Form.Item {...props.attributes} rules={[getRules]}>
            <InputNumber
                style={{ ...props.attributes.style, width: '100%' }}
                disabled={props.attributes.disabled}
                placeholder={props.attributes.placeholder}
                onBlur={valueChanged}
                controls={false}
                decimalSeparator=","
                precision={2} />
        </Form.Item>
    );
};

export default ChampDecimal;
