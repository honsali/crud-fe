import { Avatar, Col, Modal, Row, Space } from 'antd';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import useI18n from '../../noyau/i18n/useI18n';
import type { IMessageErreur } from '../../noyau/message/DomaineMessage';
import { MdlMessage, selectInfoActionEchoueeDansDialogue } from '../../noyau/message/MdlMessage';
import useAppDispatch from '../../noyau/redux/useAppDispatch';
import BoutonFort from '../bouton/texte/BoutonTexteFort';
import BoutonTexteNormal from '../bouton/texte/BoutonTexteNormal';
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

type DialogueConfirmationProps = {
    visible: boolean;
    nom: string;
    titre?: string | null;
    icone?: ReactNode | null;
    nomActionConfirmer?: string;
    actionConfirmer?: (() => void) | null;
    nomActionAnnuler?: string;
    actionAnnuler?: (() => void) | null;
    largeur?: number;
    rid?: string | null;
    inactif?: string | null;
    children?: ReactNode;
};

const DialogueConfirmation = ({ visible, nom, titre = null, icone = null, nomActionConfirmer = 'confirmer', actionConfirmer = null, nomActionAnnuler = 'annuler', actionAnnuler = null, largeur = 1000, rid = null, inactif = null, children = null }: DialogueConfirmationProps) => {
    const { i18n, erreurI18n } = useI18n();
    const infoActionEchouee = useSelector(selectInfoActionEchoueeDansDialogue);
    const dispatch = useAppDispatch();
    const [erreur, setErreur] = useState<IMessageErreur | null>(null);

    useEffect(() => {
        if (infoActionEchouee) {
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
                <BoutonTexteNormal nom={nomActionAnnuler} action={actionAnnuler ?? undefined} inactif={rid} />
                <BoutonFort nom={nomActionConfirmer} contexte={nom} action={actionConfirmer ?? undefined} rid={rid} inactif={inactif} />
            </Space>
        );
    };

    return (
        <Composant open={visible} title={getTitre()} footer={getFooter()} width={largeur} maskClosable={false} onCancel={actionAnnuler ?? undefined} closable={false}>
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
