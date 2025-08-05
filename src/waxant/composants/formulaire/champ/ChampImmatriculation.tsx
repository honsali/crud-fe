import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Form } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import _ from 'lodash';
import { useContext, useEffect, useState } from 'react';
import FormulaireValidateur from '../FormulaireValidateur';

const ChampImmatriculation = (props) => {
    const [value, setValue] = useState('71237-C-6');
    const [items, setItems] = useState<MenuProps['items']>([]);
    const { form, attributes, liste } = props;

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const changerValeur = (e) => {
        if (_.isArray(attributes.name)) {
            const v = {};
            const d = {};
            d[attributes.name[1]] = e;
            v[attributes.name[0]] = d;
            props.form.setFieldsValue(v);
        } else {
            const d = {};
            d[attributes.name] = e;
            props.form.setFieldsValue(d);
        }
    };

    const validateur = useContext(FormulaireValidateur);

    useEffect(() => {
        if (liste) {
            const l: MenuProps['items'] = [];
            liste.forEach((e, i) => {
                l.push({
                    label: (
                        <span
                            onClick={() => {
                                changerValeur(e);
                            }}
                        >
                            {e}
                        </span>
                    ),
                    key: i,
                });
            });
            setItems(l);
        }
    }, [liste]);

    const getRules = () => {
        const n = _.isArray(attributes.name) ? _.join(attributes.name, '.') : attributes.name;
        if (attributes.requis || (validateur && validateur[n] && validateur[n].requis)) {
            return { required: true, message: attributes.label + ' est requis.', whitespace: true };
        }
        return { required: false };
    };

    return (
        <div>
            <Form.Item {...attributes} rules={[getRules]}>
                <MaskedInput
                    className={'champ-' + props.form.name + '-immatriculation'}
                    value={value}
                    onChange={onChange}
                    mask="00000-a-0"
                    placeholder="12345-A-1"
                    maskOptions={{
                        lazy: false,
                        prepare: (str) => {
                            return str.toUpperCase();
                        },
                    }}
                />
            </Form.Item>

            {items && (
                <div style={{ position: 'absolute', top: '30px', right: '20px' }}>
                    <Dropdown trigger={['click']} menu={{ items }} placement="bottomRight">
                        <DownOutlined />
                    </Dropdown>
                </div>
            )}
        </div>
    );
};

export default ChampImmatriculation;
