import { Col, Form } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import util from '../../noyau/util/util';
import ListeChamp from './ListeChamp';
import useFormConverter from './useFormConverter';
const FormulaireConsultation = ({ modele, nombreColonne = 2, children }) => {
    const [items, setItems] = useState([]);
    const convert = useFormConverter();
    const [form] = Form.useForm();
    useEffect(() => {
        if (util.nonVide(modele)) {
            form.setFieldsValue(modele);
        } else {
            form.resetFields();
        }
    }, [modele]);

    useEffect(() => {
        form.setFieldsValue({});
        const liste = [];

        React.Children.forEach(children, (child, index) => {
            const colWidth = child.props.surTouteLaLigne ? 24 : 24 / nombreColonne;
            const key = `col-${index}`;
            if (child.props.cache) {
                liste.push(
                    <Col span={colWidth} key={key}>
                        <span></span>
                    </Col>
                );
            } else if (util.estNul(child.props.invisible) || !child.props.invisible) {
                liste.push(
                    <Col span={colWidth} key={key}>
                        {child.props.contenu ? React.cloneElement(child.props.contenu) : React.cloneElement(child, { modele, attributes: convert(child.props), form })}
                    </Col>
                );
                if (child.props.seulDansLaLigne) {
                    for (let j = 0; j < nombreColonne - 1; j++) {
                        liste.push(<Col span={colWidth} key={`${key}-empty-${j}`}></Col>);
                    }
                }
            }
        });

        setItems(liste);
    }, [children, nombreColonne]);


    return (
        <Form //
            form={form}
            name={_.uniqueId()}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            disabled
        >
            <ListeChamp>{items}</ListeChamp>
        </Form>
    );
};

export default FormulaireConsultation;
