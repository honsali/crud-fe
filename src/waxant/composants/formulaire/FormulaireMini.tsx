import { Col, Form } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { MdlMessage } from '../../noyau/message/MdlMessage';
import useAppDispatch from '../../noyau/redux/useAppDispatch';
import ListeChamp from './ListeChamp';
import useFormConverter from './useFormConverter';

const FormulaireMini = ({ form, siChange = null, nom = null, style = null, children }) => {
    const dispatch = useAppDispatch();
    const [items, setItems] = useState([]);
    const convert = useFormConverter();

    useEffect(() => {
        const liste = [];
        React.Children.forEach(children, (child, index) => {
            liste.push(React.cloneElement(child, { attributes: convert(nom, child.props), form }));
        });
        setItems(liste);
    }, [children, form, siChange]);

    const onFieldsChange = (changedFields, allFields) => {
        if (siChange) {
            siChange(changedFields, allFields);
        }
        dispatch(MdlMessage.initialiser());
    };

    return (
        <Form form={form} name={nom ? nom : _.uniqueId()} style={style} onFieldsChange={onFieldsChange} colon={false}>
            <ListeChamp>
                <Col span={24}>{items}</Col>
            </ListeChamp>
        </Form>
    );
};

export default FormulaireMini;
