import { Col, Row } from 'antd';
import { ActionUcAjouter, BlocAction, Panneau, Section } from 'waxant';
import { ActionEmploye } from '../ActionEmploye';
import { PageCreerEmploye } from '../ListePageEmploye';
import FiltreEmploye from './element/FiltreEmploye';
import TableauEmploye from './element/TableauEmploye';

const ViewFiltrerEmploye = () => {
    //
    return (
        <Section>
            <Row gutter={20}>
                <Col span={16}>
                    <Panneau titre="listeEmploye">
                        <TableauEmploye />
                        <BlocAction>
                            <ActionUcAjouter nom={ActionEmploye.UcFiltrerEmploye.AJOUTER_EMPLOYE} page={PageCreerEmploye} />
                        </BlocAction>
                    </Panneau>
                </Col>
                <Col span={8}>
                    <FiltreEmploye />
                </Col>
            </Row>
        </Section>
    );
};

export default ViewFiltrerEmploye;