import { Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import _ from 'lodash';
import { useContext } from 'react';
import FormulaireValidateur from '../FormulaireValidateur';

const ChampTexteLong = (props: any) => {
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
        <Form.Item {...props.attributes} rules={[getRules]} style={{ ...props.attributes.style }}>
            <TextArea
                className={'champ-' + props.attributes.cls}
                disabled={props.attributes.disabled}
                placeholder={props.attributes.placeholder}
                onBlur={valueChanged}
            />
        </Form.Item>
    );
};

export default ChampTexteLong;
