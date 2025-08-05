import { Popover } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useI18n from '../../noyau/i18n/useI18n';
import util from '../../noyau/util/util';
import ActionNormale from '../bouton/ActionNormale';
import BlocAction from '../bouton/BlocAction';
import BoutonFort from '../bouton/BoutonFort';
import BoutonNormal from '../bouton/BoutonNormal';

const Composant = styled(Popover)``;

const SEntete = styled.div`
    background-color: ${(props) => props.theme.token.colorPrimary};
    padding: 5px 10px;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
`;

const SCorp = styled.div`
    padding: 10px 20px 20px;
    font-weight: bold;
`;
const PopupConfirmation = ({ nom, libelle = null, icone = null, entete = null, actionConfirmer, rid = null, inactif = false, widthBoutonAction = null }) => {
    const { i18n } = useI18n();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (util.estNul(rid)) {
            setVisible(false);
        }
    }, [rid]);

    const annuler = () => {
        setVisible(false);
    };

    const confirmer = () => {
        setVisible(true);
    };

    const getContent = () => {
        return (
            <div>
                <SEntete>
                    {icone} &nbsp;
                    {libelle || i18n(nom)}
                </SEntete>
                <SCorp>{entete}</SCorp>
                <BlocAction>
                    {util.estNul(rid) && <BoutonNormal nom="annuler" action={annuler} />}
                    <BoutonFort nom="confirmer" action={actionConfirmer} rid={rid} />
                </BlocAction>
            </div>
        );
    };

    return (
        <Composant open={visible} content={getContent()} trigger="click" overlayInnerStyle={{ padding: 0 }}>
            <ActionNormale width={widthBoutonAction} nom={nom} icone={icone} rid={visible ? '1' : null} action={confirmer} inactif={inactif} />
        </Composant>
    );
};

export default PopupConfirmation;
