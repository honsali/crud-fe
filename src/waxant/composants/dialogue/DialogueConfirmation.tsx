import { Col, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import useI18n from '../../noyau/i18n/useI18n';
import type { IMessageErreur } from '../../noyau/message/DomaineMessage';
import { MdlMessage, selectInfoActionEchoueeDansDialogue } from '../../noyau/message/MdlMessage';
import useAppDispatch from '../../noyau/redux/useAppDispatch';
import BoutonTexteFort from '../bouton/texte/BoutonTexteFort';
import BoutonTexteNormal from '../bouton/texte/BoutonTexteNormal';
import Dialogue, { type DialogueProps } from './Dialogue';
import BoutonTexteFort from '../bouton/texte/BoutonTexteFort';


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

interface DialogueConfirmationProps extends DialogueProps {
    nomActionConfirmer?: string;
    actionConfirmer?: (() => void) | undefined;
    nomActionAnnuler?: string;
    rid?: string | null;
    inactif?: string | null;
};

const DialogueConfirmation = (props: DialogueConfirmationProps) => {
    const { visible, nom, nomActionConfirmer = 'confirmer', actionConfirmer, nomActionAnnuler = 'annuler', actionAnnuler, rid = null, inactif = null, children = null } = props;
    const { erreurI18n } = useI18n();
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



    const getFooter = () => {
        return (
            <Space>
                <BoutonTexteNormal nom={nomActionAnnuler} action={actionAnnuler} inactif={rid} />
                <BoutonTexteFort nom={nomActionConfirmer} contexte={nom} action={actionConfirmer} rid={rid} inactif={inactif} />
            </Space>
        );
    };

    return (
        <Dialogue {...props} footer={getFooter()} >
            {erreur && (
                <Row>
                    <SErreur>{erreur.titre}</SErreur>
                </Row>
            )}
            <Row>
                <SCorps span="24">{children}</SCorps>
            </Row>
        </Dialogue>
    );
};

export default DialogueConfirmation;
