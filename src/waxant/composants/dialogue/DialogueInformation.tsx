import { Col, Row, Space } from 'antd';
import styled from 'styled-components';
import BoutonFort from '../bouton/texte/BoutonTexteFort';
import Dialogue, { type DialogueProps } from './Dialogue';



const SEntete = styled(Col)`
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 10px;
`;

const SCorps = styled(Col)`
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 10px;
`;



const DialogueInformation = (props: DialogueProps) => {
    const { entete, actionAnnuler, children } = props;


    const getEntete = () => {
        if (entete) {
            return (
                <Row>
                    <SEntete span="24">{entete}</SEntete>
                </Row>
            );
        }
    };

    const getFooter = () => {
        return (
            <Space>
                <BoutonFort nom="fermer" action={actionAnnuler} />
            </Space>
        );
    };

    return (
        <Dialogue  {...props} footer={getFooter()}   >
            {getEntete()}
            {children}
        </Dialogue >
    );
};

export default DialogueInformation;
