import { Col, Row } from 'antd';
import styled from 'styled-components';
import { useContexteView, useI18n } from 'waxant';

const Composant = styled.div``;

const Entete = styled(Row)`
    color: #555;
    background-color: #ddd;
    padding: 4px 5px 4px 5px;
    border-bottom: 1px solid #999;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
`;

const Corps = styled.div`
    background-color: #f5f3f0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
`;

const Titre = styled(Col)`
    flex: none;
    font-weight: 700;
    display: flex;
    align-items: center;
    padding-top: 2px;
`;

const Action = styled(Col)`
    flex: auto;
    display: flex;
    justify-content: end;
`;

const CadreHaut = ({ titre = null, libelle = null, blocAction = null, children }) => {
    const { i18n } = useI18n();
    const { uc } = useContexteView();
    return (
        <Composant>
            <Entete>
                <Titre>{libelle || (titre && i18n(`${uc}.${titre}`)) || i18n(`${uc}.titre`)}</Titre>
                <Action>{blocAction}</Action>
            </Entete>
            <Corps>{children}</Corps>
        </Composant>
    );
};

export default CadreHaut;
