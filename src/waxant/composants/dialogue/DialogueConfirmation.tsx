import { Avatar, Col, Modal, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import useI18n from '../../noyau/i18n/useI18n';
import { MdlMessage, selectInfoActionEchoueeDansDialogue } from '../../noyau/message/MdlMessage';
import useAppDispatch from '../../noyau/redux/useAppDispatch';
import util from '../../noyau/util/util';
import BoutonFort from '../bouton/BoutonFort';
import BoutonNormal from '../bouton/BoutonNormal';
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

const DialogueConfirmation = ({ visible, nom, titre = null, icone = null, nomActionConfirmer = 'confirmer', actionConfirmer, nomActionAnnuler = 'annuler', actionAnnuler = null, largeur = 1000, rid = null, inactif = null, children = null }) => {
    const { i18n, erreurI18n } = useI18n();
    const infoActionEchouee = useSelector(selectInfoActionEchoueeDansDialogue);
    const dispatch = useAppDispatch();
    const [erreur, setErreur] = useState(null);

    useEffect(() => {
        if (util.nonNul(infoActionEchouee)) {
            setErreur(erreurI18n(infoActionEchouee));
        } else {
            setErreur(null);
        }
    }, [infoActionEchouee]);

    useEffect(() => {
        dispatch(MdlMessage.initialiser());
    }, [visible]);

    const getTitre = () => {
        return (
            <span>
                {icone && <SAvatar shape="circle" src={icone} size={32} />}
                {titre || i18n(nom)}
            </span>
        );
    };

    const getFooter = () => {
        return (
            <Space>
                <BoutonNormal nom={nomActionAnnuler} action={actionAnnuler} inactif={rid} />
                <BoutonFort nom={nomActionConfirmer} contexte={nom} action={actionConfirmer} rid={rid} inactif={inactif} />
            </Space>
        );
    };

    return (
        <Composant open={visible} title={getTitre()} footer={getFooter()} width={largeur} maskClosable={false} onCancel={actionAnnuler} closable={false}>
            {erreur && (
                <Row>
                    <SErreur>{erreur.titre}</SErreur>
                </Row>
            )}
            <Row>
                <SCorps span="24">{children}</SCorps>
            </Row>
        </Composant>
    );
};

export default DialogueConfirmation;
