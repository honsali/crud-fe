import { Col, Row } from 'antd';
import { ActionUcAjouter, Bloc, CadreFort, Section } from 'waxant';
import { ActionEmploye } from '../ActionEmploye';
import { PageCreerEmploye } from '../ListePageEmploye';
import FiltreEmploye from './element/FiltreEmploye';
import TableauEmploye from './element/TableauEmploye';

const ViewFiltrerEmploye = () => {
    //
    return (
        <Bloc marge="20px 40px">
            <Row gutter={20}>
                <Col span={16}>
                    <Section marge="0"
                        blocAction={
                            <ActionUcAjouter nom={ActionEmploye.UcFiltrerEmploye.AJOUTER_EMPLOYE} page={PageCreerEmploye} />
                        }
                    >
                        <CadreFort titre="listeEmploye">
                            <TableauEmploye />
                        </CadreFort>
                    </Section>
                </Col>
                <Col span={8}>
                    <Bloc marge="62px 0px">
                        <FiltreEmploye />
                    </Bloc>
                </Col>
            </Row>
        </Bloc>
    );
};

export default ViewFiltrerEmploye;