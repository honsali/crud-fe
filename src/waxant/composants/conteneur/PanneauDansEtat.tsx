import { Col, Row } from 'antd';
import styled from 'styled-components';
import useContexteView from 'waxant/noyau/contexte/ContexteView';
import useI18n from '../../noyau/i18n/useI18n';

const Composant = styled(Row)`
    padding: 10px 7px 3px 7px;
`;

const Entete = styled(Col)`
    color: #aaa;
    font-weight: 700;
    font-size: 13px;
    padding-left: 5px;
    height: 100%;
`;

const Corps = styled(Col)`
    color: #444;
    font-weight: 500;
    font-size: 14px;
    text-align: right;
`;

const PanneauDansEtat = ({ titre = null, libelle = null, children }) => {
    const { i18n } = useI18n();
    const { uc } = useContexteView();
    return (
        <Composant>
            <Entete flex="240px">{libelle || i18n(uc + '.' + titre)}</Entete>
            <Corps flex="560px">{children}</Corps>
        </Composant>
    );
};

export default PanneauDansEtat;
