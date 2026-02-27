import { Col, ConfigProvider, Form } from 'antd';
import _ from 'lodash';
import type { CSSProperties, ReactNode } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import { MdlMessage } from '../../noyau/message/MdlMessage';
import useAppDispatch from '../../noyau/redux/useAppDispatch';
import util from '../../noyau/util/util';
import ListeChamp from './ListeChamp';
import useFormConverter from './useFormConverter';

type FormulaireProps = {
    form: any;
    siChange?: ((changedFields: any, allFields: any) => void) | null;
    nombreColonne?: number;
    nom?: string | null;
    style?: CSSProperties;
    children?: ReactNode;
};

const Formulaire = ({ form, siChange = null, nombreColonne = 1, nom = null, style, children }: FormulaireProps) => {
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
            const element = child as React.ReactElement<any>;
            const colWidth = element.props.surTouteLaLigne ? 24 : 24 / nombreColonne;
            const key = `col-${index}`;
            if (element.props.hidden) {
                hiddenListe.push(<span key={key}>{React.cloneElement(element, { attributes: convert(nom, element.props), form })}</span>);
            } else if (element.props.cache) {
                liste.push(
                    <Col span={colWidth} key={key}>
                        <span></span>
                    </Col>
                );
            } else if (util.estNul(element.props.invisible) || !element.props.invisible) {
                const contenuElement = element.props.contenu;
                const contenu = React.isValidElement(contenuElement)
                    ? React.cloneElement(contenuElement)
                    : React.cloneElement(element, { attributes: convert(nom, element.props), form });
                liste.push(
                    <Col span={colWidth} key={key}>
                        {contenu}
                    </Col>
                );
                if (element.props.seulDansLaLigne) {
                    for (let j = 0; j < nombreColonne - 1; j++) {
                        liste.push(<Col span={colWidth} key={`${key}-empty-${j}`}></Col>);
                    }
                }
            }
        });

        setHiddenItems(hiddenListe);
        setItems(liste);
    }, [children, nombreColonne, form, siChange]);

    const onFieldsChange = useCallback((changedFields, allFields) => {
        siChange?.(changedFields, allFields);
        dispatch(MdlMessage.initialiser());
    }, [siChange, dispatch]);

    return (
        <ConfigProvider theme={{ token: { colorBorder: '#ccc' } }}>
            <Form //
                form={form}
                name={nom ? nom : _.uniqueId()}
                style={style ?? undefined}
                onFieldsChange={onFieldsChange}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                layout="vertical"
            >
                <ListeChamp>{items}</ListeChamp>
                <div>{hiddenItems}</div>
            </Form>
        </ConfigProvider>
    );
};

export default Formulaire;
