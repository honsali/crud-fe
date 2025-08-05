import { Avatar, Col, Modal, Row } from 'antd';
import styled from 'styled-components';
import useI18n from '../../noyau/i18n/useI18n';
import BlocAction from '../bouton/BlocAction';
import BoutonFort from '../bouton/BoutonFort';

const Composant = styled(Modal)`
    .ant-modal-content {
        padding: 0;
        border-radius: 6px;
        .ant-modal-header {
            padding: 10px;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            background-color: #f9f9f9;
            border-bottom: 1px solid #ddd;
            .ant-modal-title {
                font-weight: 500;
                color: ${(props) => props.theme.token.colorPrimary};
                font-size: 26px;
                margin-top: 10px;
            }
        }
        .ant-modal-body {
            padding: 10px 20px;
        }
        .ant-modal-footer {
            padding: 10px;
            background-color: #fdfcfa;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            border-top: 1px solid #ddd;
        }
    }
`;

const SAvatar = styled(Avatar)`
    background-color: #fefefe;
    border: 1px solid #ddd;
    margin: 0 5px 5px 0;
    svg {
        margin-top: 1px;
        fill: ${(props) => props.theme.token.colorPrimary};
        width: 22px;
    }
`;

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

const SErreur = styled(Col)`
    font-weight: 700;
    font-size: 18px;
    color: red;
    margin-bottom: 10px;
`;

const DialogueInformation = ({ visible, nom, libelle = null, icone = null, entete = null, actionAnnuler = null, largeur = 1000, children }) => {
    const { i18n } = useI18n();
    const getTitre = () => {
        return (
            <span>
                {icone && <SAvatar shape="circle" src={icone} size={32} />}
                {libelle || i18n(nom)}
            </span>
        );
    };

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
            <BlocAction>
                <BoutonFort nom="fermer" action={actionAnnuler} />
            </BlocAction>
        );
    };

    return (
        <Composant open={visible} title={getTitre()} footer={getFooter()} width={largeur} maskClosable={false} onCancel={actionAnnuler}>
            {getEntete()}
            <Row>
                <SCorps span="24">{children}</SCorps>
            </Row>
        </Composant>
    );
};

export default DialogueInformation;
