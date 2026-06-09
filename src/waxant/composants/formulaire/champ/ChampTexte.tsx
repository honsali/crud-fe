import { Form, Input } from 'antd';
import _ from 'lodash';
import { useContext } from 'react';
import FormulaireValidateur from '../FormulaireValidateur';

const ChampTexte = (props) => {
    const validateur = useContext(FormulaireValidateur);

    const getRules = () => {
        const n = _.isArray(props.attributes.name) ? _.join(props.attributes.name, '.') : props.attributes.name;
        if (props.attributes.requis || (validateur && validateur[n] && validateur[n].requis)) {
            return { required: true, message: props.attributes.label ?? props.attributes.fallBackLabel + ' est requis.', whitespace: true };
        }
        return { required: false };
    };

    const valueChanged = (a) => {
        if (props.attributes.siChange) {
            props.attributes.siChange(a?.target?.value);
        }
    };

    const { siChange, fallBackLabel, requis, cls, cname, entite, arg, lname, slabel, sname, ...formItemProps } = props.attributes;

    return (
        <Form.Item key={cname} {...formItemProps} rules={[getRules]} style={{ ...props.attributes.style }}>
            <Input
                className={'champ-' + cls}//
                disabled={props.attributes.disabled}
                placeholder={props.attributes.placeholder}
                onPressEnter={valueChanged}
                onBlur={valueChanged}
            />
        </Form.Item>
    );
};

export default ChampTexte;
