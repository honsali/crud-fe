import { AutoComplete, Form } from 'antd';
import _ from 'lodash';
import { useContext, useState } from 'react';
import FormulaireValidateur from '../FormulaireValidateur';

const ChampEmail = (props) => {
    const validateur = useContext(FormulaireValidateur);
    const { form, attributes } = props;
    const [options, setOptions] = useState<any[]>([]);


    const getRules = () => {
        const n = _.isArray(props.attributes.name) ? _.join(props.attributes.name, '.') : props.attributes.name;
        if (props.attributes.requis || (validateur && validateur[n] && validateur[n].requis)) {
            return { type: 'email', required: true, message: props.attributes.label + ' est requis.', whitespace: true };
        }
        return { type: 'email', required: false };
    };

    const handleSearch = (value: string) => {
        setOptions(() => {
            if (!value || value.includes('@')) {
                return [];
            }
            return ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'].map((domain) => ({
                label: `${value}@${domain}`,
                value: `${value}@${domain}`,
            }));
        });
    };

    return (
        <Form.Item key={props.attributes.cname} {...props.attributes} rules={[getRules]} style={{ ...props.attributes.style }}>
            <AutoComplete
                className={'champ-' + props.attributes.cls}
                disabled={props.attributes.disabled}
                placeholder={props.attributes.placeholder}
                options={options}
                onSearch={handleSearch}
            />
        </Form.Item>
    );
};

export default ChampEmail;
