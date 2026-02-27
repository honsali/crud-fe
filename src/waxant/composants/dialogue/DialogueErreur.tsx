import { SwapRightOutlined, WarningOutlined } from '@ant-design/icons';
import { Col, Modal, Row } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { BoutonFort, useContexteAuth } from 'waxant';
import useI18n from '../../noyau/i18n/useI18n';
import type { IMessageErreur } from '../../noyau/message/DomaineMessage';
import { MdlMessage, selectInfoActionEchouee } from '../../noyau/message/MdlMessage';
import useAppDispatch from '../../noyau/redux/useAppDispatch';
import util from '../../noyau/util/util';

const SDialogErreur = styled(Modal)`
    padding: 0;
    .ant-modal-content {
        border-radius: 6px;
        padding: 0;
        .ant-modal-body {
            padding: 0;
        }
        .ant-modal-footer {
            display: none;
        }
    }
`;

export const SDialogErreurEntete = styled(Col)`
    background-color: #333;
    color: orange;
    padding: 60px 10px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    .icone {
        margin: auto;
        text-align: center;
        width: 70px;
        font-size: 70px;
        line-height: 30px;
        padding: 0;
    }
    .titre {
        margin: auto;
        font-weight: 400;
        font-size: 30px;
        text-align: center;
        .anticon svg {
            width: 36px;
        }
    }
`;

export const SDialogErreurCorps = styled(Col)`
    font-weight: 500;
    font-size: 18px;
    padding: 20px 20px 60px 20px;
    position: relative;
    .titre {
        color: orange;
        font-size: 24px;
        font-weight: 300;
    }
    .sousTitre {
        font-size: 18px;
    }
    .action {
        text-align: right;
    }
    .detail {
        font-size: 14px;
    }
`;

export const SDialogueErreurFooter = styled.div`
    text-align: right;
    position: absolute;
    bottom: 20px;
    right: 20px;
`;

const DialogueErreur = () => {
    const { erreurI18n } = useI18n();
    const dispatch = useAppDispatch();
    const infoActionEchouee = useSelector(selectInfoActionEchouee);
    const [erreur, setErreur] = useState<IMessageErreur | null>(null);
    const { logout } = useContexteAuth();

    useEffect(() => {
        if (infoActionEchouee) {
            const code: any = infoActionEchouee?.code;
            if (code?.status === 403) {
                setErreur(erreurI18n({ code: 'error.url.not.authorized' }));
            } else {
                const lst = erreurI18n(infoActionEchouee);
                setErreur(lst);
            }
        } else {
            setErreur(null);
        }
    }, [infoActionEchouee]);

    const fermer = () => {
        setErreur(null);
        dispatch(MdlMessage.initialiser());
    };

    const afficherListeErreur = useCallback(() => {
        const items = (erreur?.listeErreur ?? []).map((e, i) => (
            <div className="detail" key={i}>
                <SwapRightOutlined /> {e}
            </div>
        ));
        return items;
    }, [erreur]);

    return (
        <SDialogErreur open={util.nonNul(infoActionEchouee)} closable={false} width={600} zIndex={9999}>
            {infoActionEchouee && (
                <Row>
                    <SDialogErreurEntete span="8">
                        <div className="icone">
                            <WarningOutlined />
                        </div>
                        <div className="titre">Erreur</div>
                    </SDialogErreurEntete>

                    <SDialogErreurCorps span="16">
                        <div>
                            <div className="titre">{erreur?.titre}</div>
                            <div className="message">{erreur?.sousTitre}</div>
                            {afficherListeErreur()}
                        </div>
                        <SDialogueErreurFooter>
                            <BoutonFort action={fermer} libelle="Fermer" />
                        </SDialogueErreurFooter>
                    </SDialogErreurCorps>
                </Row>
            )}
        </SDialogErreur>
    );
};

export default DialogueErreur;
