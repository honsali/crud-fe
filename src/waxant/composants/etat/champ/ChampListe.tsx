import { Form, Input, Select } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import util from '../../../noyau/util/util';

const ChampListe = (props) => {
    const { Option } = Select;
    const [options, setOptions] = useState([]);
    const [current, setCurrent] = useState(null);
    const [referenceListe, setReferenceListe] = useState(null);
    const [selectAttributes, setSelectAttributes] = useState(null);
    const { form, attributes, liste, optionLibelle } = props;
    const newValue = Form.useWatch(attributes.name, form);

    useEffect(() => {
        setReference(referenceListe, newValue);
    }, [newValue]);

    useEffect(() => {
        setSelectAttributes({ ...attributes, name: attributes.sname });
        const refOptionList = [];
        if (liste) {
            setReferenceListe(liste);
            if (Array.isArray(liste)) {
                liste.forEach((r) => {
                    const libelle = optionLibelle ? r[optionLibelle] : r.libelle;
                    const id = r.id ? r.id : '-1';
                    refOptionList.push(
                        <Option value={id} key={id}>
                            {libelle}
                        </Option>
                    );
                });
            }
            setOptions(refOptionList);
            const z = form.getFieldValue(attributes.name);
            setReference(liste, z);
        }
    }, [liste, optionLibelle]);


    const setReference = (liste, valeur) => {
        if (liste && liste.length > 0 && valeur?.id !== current?.id) {
            setCurrent(valeur);
            let x = valeur?.id ? _.find(liste, { id: valeur.id }) : {};
            if (util.estVide(x)) {
                x = { id: null, libelle: null };
            }
            if (_.isArray(attributes.name)) {
                const v = {};
                const d = {};
                d[attributes.name[1]] = x;
                d[attributes.sname[1]] = x?.libelle;
                v[attributes.name[0]] = d;
                form.setFieldsValue(v);
            } else {
                const d = {};
                d[attributes.name] = x;
                d[attributes.sname] = x?.libelle;
                form.setFieldsValue(d);
            }

            if (attributes.onChange) {
                attributes.onChange(x);
            }
        }
    };

    const filter = (input, option) => {
        if (option.children) {
            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }
        return false;
    };


    if (selectAttributes) {
        return (
            <div style={{ ...attributes.style, width: '800px' }}>
                <Form.Item {...selectAttributes}    >
                    <Select //

                        disabled={attributes.disabled}
                        showSearch
                        optionFilterProp="children"
                        allowClear
                        filterOption={filter}
                    >
                        {options}
                    </Select>
                </Form.Item>
                <Form.Item name={attributes.name} noStyle>
                    <Input style={{ display: 'none' }} />
                </Form.Item>
            </div>
        );
    }
};

export default ChampListe;
