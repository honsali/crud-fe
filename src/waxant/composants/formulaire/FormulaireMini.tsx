import { Col, Form } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { MdlMessage } from '../../noyau/message/MdlMessage';
import useAppDispatch from '../../noyau/redux/useAppDispatch';
import ListeChamp from './ListeChamp';
import useFormConverter from './useFormConverter';

type FormulaireMiniProps = {
    form: any;
    siChange?: ((changedFields: any, allFields: any) => void) | null;
    nom?: string | null;
    style?: CSSProperties;
    children?: ReactNode;
};

const FormulaireMini = ({ form, siChange = null, nom = null, style, children }: FormulaireMiniProps) => {
    const dispatch = useAppDispatch();
    const [items, setItems] = useState<ReactNode[]>([]);
    const convert = useFormConverter();

    useEffect(() => {
        const liste: ReactNode[] = [];
        React.Children.forEach(children, (child, index) => {
            if (!React.isValidElement(child)) {
                return;
            }
            const element = child as React.ReactElement<any>;
            liste.push(React.cloneElement(element, { attributes: convert(nom, element.props), form }));
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
        <Form form={form} name={nom ? nom : _.uniqueId()} style={style ?? undefined} onFieldsChange={onFieldsChange} colon={false}>
            <ListeChamp>
                <Col span={24}>{items}</Col>
            </ListeChamp>
        </Form>
    );
};

export default FormulaireMini;
