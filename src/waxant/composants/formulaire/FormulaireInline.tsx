import { Col, Form } from 'antd';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { MdlMessage } from '../../noyau/message/MdlMessage';
import useAppDispatch from '../../noyau/redux/useAppDispatch';
import ListeChamp from './ListeChamp';
import useFormConverter from './useFormConverter';

const FormulaireInline = ({ form, siChange = null, nom = null, style = null, children }) => {
    const dispatch = useAppDispatch();
    const [items, setItems] = useState([]);
    const [hiddenItems, setHiddenItems] = useState([]);
    const convert = useFormConverter();

    useEffect(() => {
        const hiddenListe = [];
        const liste = [];

        React.Children.forEach(children, (child, index) => {
            const key = `col-${index}`;
            liste.push(
                <Col key={key} flex={child.props.largeur ? child.props.largeur : 'auto'}>
                    {React.cloneElement(child, { attributes: convert(nom, child.props), form })}
                </Col>
            );
        });

        setHiddenItems(hiddenListe);
        setItems(liste);
    }, [children, form, siChange]);

    const onFieldsChange = useCallback((changedFields, allFields) => {
        siChange?.(changedFields, allFields);
        dispatch(MdlMessage.initialiser());
    }, [siChange, dispatch]);

    return (
        <Form //
            form={form}
            name={nom ? nom : _.uniqueId()}
            style={{ flex: 1, paddingRight: '20px', ...style }}
            layout="vertical"
            onFieldsChange={onFieldsChange}
        >

            <ListeChamp>{items}</ListeChamp>
            <div>{hiddenItems}</div>
        </Form>
    );
};

export default FormulaireInline;
