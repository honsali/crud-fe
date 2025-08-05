import { CloseOutlined, EditFilled } from '@ant-design/icons';
import { Form, Input } from 'antd';
import _ from 'lodash';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import BoutonIcone from '../../bouton/BoutonIcone';
import FormulaireValidateur from '../FormulaireValidateur';

export const Composant = styled(Input)`
    cursor: pointer !important;
    .ant-input-group-addon {
        background-color: ${(props) => props.theme.token.colorPrimary};
        color: white;
        cursor: pointer;
    }
`;
const ChampTexteModifiableParDialogue = (props) => {
    const validateur = useContext(FormulaireValidateur);
    const [visible, setVisible] = useState(false);

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
    const afficherDialogue = () => {
        setVisible(true);
    };

    const initialiser = () => {
        if (_.isArray(props.attributes.name)) {
            const v = {};
            const d = {};
            d[props.attributes.name[1]] = null;
            v[props.attributes.name[0]] = d;
            props.form.setFieldsValue(v);
        } else {
            const d = {};
            d[props.attributes.name] = null;
            props.form.setFieldsValue(d);
        }
        if (props.attributes.onChange) {
            props.attributes.onChange(null);
        }
    };
    return (
        <div>
            <Form.Item {...props.attributes} disabled rules={[getRules]}>
                <Composant
                    style={props.attributes.style}
                    disabled
                    placeholder={props.attributes.placeholder}
                    onBlur={valueChanged}
                    addonAfter={
                        <span>
                            <BoutonIcone nom="modifier" icone={<EditFilled />} taille="mini" forme="plein" action={afficherDialogue} /> |&nbsp;
                            <BoutonIcone nom="initialiser" icone={<CloseOutlined />} taille="mini" forme="plein" action={initialiser} />
                        </span>
                    }
                />
            </Form.Item>
            {React.cloneElement(props.dialogue, { visible, setVisible })}
        </div>
    );
};

export default ChampTexteModifiableParDialogue;
