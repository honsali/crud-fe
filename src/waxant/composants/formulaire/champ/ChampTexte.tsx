import { Form, Input } from 'antd';
import _ from 'lodash';
import { useContext } from 'react';
import FormulaireValidateur from '../FormulaireValidateur';

const ChampTexte = (props) => {
    const validateur = useContext(FormulaireValidateur);

    const getRules = () => {
        const n = _.isArray(props.attributes.name) ? _.join(props.attributes.name, '.') : props.attributes.name;
        if (props.attributes.requis || (validateur && validateur[n] && validateur[n].requis)) {
            return { required: true, message: props.attributes.label + ' est requis.', whitespace: true };
        }
        return { required: false };
    };

    const valueChanged = (a) => {
        if (props.attributes.onChange) {
            props.attributes.onChange(a);
        }
    };
    return (
        <Form.Item key={props.attributes.cname} {...props.attributes} rules={[getRules]} style={{ ...props.attributes.style }}>
            <Input
                className={'champ-' + props.attributes.cls}//
                disabled={props.attributes.disabled}
                placeholder={props.attributes.placeholder}
                onBlur={valueChanged}
                addonAfter={props.addonAfter}
            />
        </Form.Item>
    );
};

export default ChampTexte;
