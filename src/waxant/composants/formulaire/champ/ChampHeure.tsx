import { Form } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import _ from 'lodash';
import { useContext, useState } from 'react';
import FormulaireValidateur from '../FormulaireValidateur';

const ChampHeure = (props) => {
    const [value, setValue] = useState('');
    const onChange = (e) => {
        setValue(e.target.value);
    };

    const validateur = useContext(FormulaireValidateur);

    const getRules = () => {
        const n = _.isArray(props.attributes.name) ? _.join(props.attributes.name, '.') : props.attributes.name;
        if (props.attributes.requis || (validateur && validateur[n] && validateur[n].requis)) {
            return { required: true, message: props.attributes.label + ' est requis.', whitespace: true };
        }
        return { required: false };
    };

    return (
        <Form.Item {...props.attributes} rules={[getRules]}>
            <MaskedInput //
                className={'champ-' + props.attributes.cls}
                value={value}
                onChange={onChange}
                mask="00:00"
                maskOptions={{}}
            />
        </Form.Item>
    );
};

export default ChampHeure;
