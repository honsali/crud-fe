import { Col, Form } from 'antd';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { MdlMessage } from '../../noyau/message/MdlMessage';
import useAppDispatch from '../../noyau/redux/useAppDispatch';
import util from '../../noyau/util/util';
import ListeChamp from './ListeChamp';
import useFormConverter from './useFormConverter';

const Formulaire = ({ form, siChange = null, nombreColonne = 1, nom = null, style = null, children }) => {
    const dispatch = useAppDispatch();
    const [items, setItems] = useState([]);
    const [hiddenItems, setHiddenItems] = useState([]);
    const convert = useFormConverter();

    useEffect(() => {
        const hiddenListe = [];
        const liste = [];

        React.Children.forEach(children, (child, index) => {
            const colWidth = child.props.surTouteLaLigne ? 24 : 24 / nombreColonne;
            const key = `col-${index}`;
            if (child.props.hidden) {
                hiddenListe.push(<span key={key}>{React.cloneElement(child, { attributes: convert(nom, child.props), form })}</span>);
            } else if (child.props.cache) {
                liste.push(
                    <Col span={colWidth} key={key}>
                        <span></span>
                    </Col>
                );
            } else if (util.estNul(child.props.invisible) || !child.props.invisible) {
                liste.push(
                    <Col span={colWidth} key={key}>
                        {child.props.contenu ? React.cloneElement(child.props.contenu) : React.cloneElement(child, { attributes: convert(nom, child.props), form })}
                    </Col>
                );
                if (child.props.seulDansLaLigne) {
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
        <Form //
            form={form}
            name={nom ? nom : _.uniqueId()}
            style={style}
            onFieldsChange={onFieldsChange}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
        >
            <ListeChamp>{items}</ListeChamp>
            <div>{hiddenItems}</div>
        </Form>
    );
};

export default Formulaire;
