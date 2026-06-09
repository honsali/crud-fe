import { Col, Form, Row } from 'antd';
import type { ReactNode } from 'react';
import { Bloc, ChampTexte, Formulaire } from 'waxant';
import { useContextConsulterMenu } from '../../ContextConsulterMenu';
import Carte from '../Carte';

const Definition = ({ type, children }: { type: string; children?: ReactNode }) => {
    const { carteCourante } = useContextConsulterMenu();
    const [form] = Form.useForm();

    if (carteCourante !== type) return null;

    return (
        <Row gutter={40}>
            <Col flex={0}>
                <Carte type={type} />
            </Col>
            <Col flex={1}>
                <Bloc largeur="500px">
                    <Formulaire form={form} nombreColonne={2}>
                        <ChampTexte nom="name" libelle="Titre de la page" />
                        <ChampTexte nom="icon" libelle="Icone - FontAwesome" />
                        {children}
                    </Formulaire>
                </Bloc>
            </Col>
        </Row>
    );
};

export default Definition;
