import { Col, ConfigProvider, Form } from 'antd';
import _ from 'lodash';
import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import util from '../../noyau/util/util';
import ListeChamp from './ListeChamp';
import useFormConverter from './useFormConverter';

type FormulaireConsultationProps = {
    modele?: any;
    nombreColonne?: 1 | 2 | 3;
    children?: ReactNode;
};

const FormulaireConsultation = ({ modele, nombreColonne = 2, children }: FormulaireConsultationProps) => {
    const [items, setItems] = useState<ReactNode[]>([]);
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
        const liste: ReactNode[] = [];

        React.Children.forEach(children, (child, index) => {
            if (!React.isValidElement(child)) {
                return;
            }
            const element = child as React.ReactElement<any>;
            const colWidth = element.props.surTouteLaLigne ? 24 : 24 / nombreColonne;
            const key = `col-${index}`;
            if (element.props.cache) {
                liste.push(
                    <Col span={colWidth} key={key}>
                        <span></span>
                    </Col>
                );
            } else if (util.estNul(element.props.invisible) || !element.props.invisible) {
                const contenuElement = element.props.contenu;
                const contenu = React.isValidElement(contenuElement)
                    ? React.cloneElement(contenuElement)
                    : React.cloneElement(element, { modele, attributes: convert(element.props), form });
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

        setItems(liste);
    }, [children, nombreColonne]);


    return (
        <ConfigProvider theme={{ token: { colorTextDisabled: '#333', colorBgContainerDisabled: '#F5F7FB' } }}>
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
        </ConfigProvider>
    );
};

export default FormulaireConsultation;