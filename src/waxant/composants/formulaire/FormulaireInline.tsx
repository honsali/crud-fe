import { Col, Form } from 'antd';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { MdlMessage } from '../../noyau/message/MdlMessage';
import useAppDispatch from '../../noyau/redux/useAppDispatch';
import ListeChamp from './ListeChamp';
import useFormConverter from './useFormConverter';

type FormulaireInlineProps = {
    form: any;
    siChange?: ((changedFields: any, allFields: any) => void) | null;
    nom?: string | null;
    style?: CSSProperties;
    children?: ReactNode;
};

const FormulaireInline = ({ form, siChange = null, nom = null, style, children }: FormulaireInlineProps) => {
    const dispatch = useAppDispatch();
    const [items, setItems] = useState<ReactNode[]>([]);
    const [hiddenItems, setHiddenItems] = useState<ReactNode[]>([]);
    const convert = useFormConverter();

    useEffect(() => {
        const hiddenListe: ReactNode[] = [];
        const liste: ReactNode[] = [];

        React.Children.forEach(children, (child, index) => {
            if (!React.isValidElement(child)) {
                return;
            }
            const key = `col-${index}`;
            const element = child as React.ReactElement<any>;
            liste.push(
                <Col key={key} flex={element.props.largeur ? element.props.largeur : 'auto'}>
                    {React.cloneElement(element, { attributes: convert(nom, element.props), form })}
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
            style={{ flex: 1, paddingRight: '20px', ...(style ?? {}) }}
            layout="vertical"
            onFieldsChange={onFieldsChange}
        >

            <ListeChamp>{items}</ListeChamp>
            <div>{hiddenItems}</div>
        </Form>
    );
};

export default FormulaireInline;
