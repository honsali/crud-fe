import { Col, Row } from 'antd';
import styled from 'styled-components';
import useContexteView from 'waxant/noyau/contexte/ContexteView';
import useI18n from '../../noyau/i18n/useI18n';

const Composant = styled.div`
    background-color: #fff;
    &.transparent.primaire {
        background-color: transparent;
    }
`;

const Entete = styled(Row)`
    align-items: center;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;

    color: ${(props) => props.theme.token.colorPrimary};
    background-color: transparent;
    border: none;
    border-bottom: 1px solid ${(props) => `${props.theme.token.colorPrimary}4D`};
    padding: 5px 5px 0 5px;
`;

const Titre = styled(Col)`
    flex: none;
    padding-bottom: 3px;
    font-weight: 700;
`;

const Action = styled(Col)`
    flex: auto;
    text-align: right;
    height: 28px;
    .ant-btn {
        padding: 2px 10px 0 10px;
        height: 22px;
        font-size: 12px;
    }
`;

const Corps = styled(Row)`
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;

    background-color: transparent;
    border: none;
`;

const PanneauTransparentPrimaire = ({ titre = null, libelle = null, marge = '10px', blocAction = null, children }) => {
    const { i18n } = useI18n();
    const { uc } = useContexteView();
    return (
        <Composant>
            {(titre || libelle) && (
                <Entete>
                    <Titre> {libelle || i18n(uc + '.' + titre)}</Titre>
                    <Action> {blocAction}</Action>
                </Entete>
            )}
            <Corps style={{ padding: marge }}>
                <Col span={24}>{children}</Col>
            </Corps>
        </Composant>
    );
};

export default PanneauTransparentPrimaire;
