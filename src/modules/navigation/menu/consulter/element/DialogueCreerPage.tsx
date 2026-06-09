import { Col, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Bloc, BoutonTexteFort, BoutonTexteNormal, Dialogue, MdlMessage, selectInfoActionEchoueeDansDialogue, useAppDispatch, useI18n, type IMessageErreur } from 'waxant';
import type { DialogueProps } from 'waxant/composants/dialogue/Dialogue';
import { useContextConsulterMenu } from '../ContextConsulterMenu';
import Carte from './Carte';
import DefinitionPageChercher from './definition/DefinitionPageChercher';
import DefinitionPageConsulter from './definition/DefinitionPageConsulter';
import DefinitionPageCreer from './definition/DefinitionPageCreer';
import DefinitionPageLister from './definition/DefinitionPageLister';
import DefinitionPageModifier from './definition/DefinitionPageModifier';
import DefinitionPageOnglet from './definition/DefinitionPageOnglet';
import DefinitionPageVide from './definition/DefinitionPageVide';


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

const DialogueCreerPage = ({ visible, setVisible }) => {

    const { erreurI18n } = useI18n();
    const infoActionEchouee = useSelector(selectInfoActionEchoueeDansDialogue);
    const dispatch = useAppDispatch();
    const [erreur, setErreur] = useState<IMessageErreur | null>(null);
    const { carteCourante, setCarteCourante } = useContextConsulterMenu();

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

    const actionAnnuler = () => {
        setVisible(false);
        setCarteCourante(null);
    };

    const actionConfirmer = () => {

    };

    const getFooter = () => {
        if (carteCourante) {
            return (
                <Space>
                    <BoutonTexteNormal nom="annuler" action={actionAnnuler} />
                    <BoutonTexteFort nom={`creer.${carteCourante}`} action={actionConfirmer} />
                </Space>
            );
        }
        return (
            <Space>
                <BoutonTexteNormal nom="annuler" action={actionAnnuler} />
            </Space>
        );
    };

    return (
        <Dialogue visible={visible} nom="creerPage" footer={getFooter()} largeur={800}>
            {erreur && (
                <Row>
                    <SErreur>{erreur.titre}</SErreur>
                </Row>
            )}
            <Row>
                <Bloc>
                    {carteCourante === null && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center' }}>
                            <Carte type="pageVide" />
                            <Carte type="pageChercher" />
                            <Carte type="pageLister" />
                            <Carte type="pageConsulter" />
                            <Carte type="pageCreer" />
                            <Carte type="pageModifier" />
                            <Carte type="pageOnglet" />
                        </div>
                    )}
                    {carteCourante !== null && (
                        <div>
                            <DefinitionPageVide />
                            <DefinitionPageChercher />
                            <DefinitionPageLister />
                            <DefinitionPageConsulter />
                            <DefinitionPageCreer />
                            <DefinitionPageModifier />
                            <DefinitionPageOnglet />
                        </div>
                    )}
                </Bloc>
            </Row>
        </Dialogue>
    );
};

export default DialogueCreerPage;
