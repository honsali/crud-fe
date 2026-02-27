import { Avatar, Col, Modal, Row, Space } from 'antd';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import useI18n from '../../noyau/i18n/useI18n';
import type { IMessageErreur } from '../../noyau/message/DomaineMessage';
import { selectInfoActionEchoueeDansDialogue } from '../../noyau/message/MdlMessage';
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

const BlocBouton = styled.div`
    line-height: 0;
    .btn-wrapper {
        margin: 0 5px;
    }
    .btn-wrapper:first-child {
        margin: 0 5px 0 0;
    }
    .btn-wrapper:last-child {
        margin: 0 0 0 5px;
    }
    .btn-wrapper:only-child {
        margin: 0;
    }
`;

type DialogueOuiNonProps = {
    visible: boolean;
    nom: string;
    libelle?: string | null;
    icone?: ReactNode | null;
    entete?: ReactNode | null;
    nomActionOui?: string;
    nomActionNon?: string;
    actionOui?: (() => void) | null;
    actionNon?: (() => void) | null;
    nomActionAnnuler?: string;
    actionAnnuler?: (() => void) | null;
    largeur?: number;
    rid?: string | null;
    children?: ReactNode;
};

const DialogueOuiNon = ({ visible, nom, libelle = null, icone = null, entete = null, nomActionOui = 'accepter', nomActionNon = 'refuser', actionOui = null, actionNon = null, nomActionAnnuler = 'annuler', actionAnnuler = null, largeur = 520, rid = null, children }: DialogueOuiNonProps) => {
    const { i18n, erreurI18n } = useI18n();
    const infoActionEchouee = useSelector(selectInfoActionEchoueeDansDialogue);

    const [erreur, setErreur] = useState<IMessageErreur | null>(null);

    useEffect(() => {
        if (infoActionEchouee) {
            setErreur(erreurI18n(infoActionEchouee));
        } else {
            setErreur(null);
        }
    }, [infoActionEchouee]);

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
            <Space>
                <BoutonTexteNormal nom={nomActionAnnuler} action={actionAnnuler ?? undefined} inactif={rid} />
                <BoutonFort nom={nomActionNon} contexte={nom} action={actionNon ?? undefined} rid={rid} inactif={rid} />
                <BoutonFort nom={nomActionOui} contexte={nom} action={actionOui ?? undefined} rid={rid} inactif={rid} />
            </Space>
        );
    };

    return (
        <Composant open={visible} title={getTitre()} footer={getFooter()} width={largeur} maskClosable={false} onCancel={actionAnnuler ?? undefined}>
            {getEntete()}
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

export default DialogueOuiNon;
