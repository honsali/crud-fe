import { Col, Row } from 'antd';
import styled from 'styled-components';
import { useContexteView, useI18n } from 'waxant';

const Composant = styled.div`
    background-color: #e9e5e0;
    border: 1px solid transparent;
    border-radius: 6px;
`;

const Entete = styled(Row)`
    align-items: center;
    padding: 20px 20px 0 20px;
`;

const Corps = styled.div`
    margin: 20px;
    padding: 2;
    border: 1px solid transparent;
`;

const Titre = styled(Col)`
    flex: none;
    display: inline-block;
    padding-top: 8px;
    font-size: 24px;
    font-weight: 500;
    color: #000000dd;
`;

const Filtre = ({ titre, children }) => {
    const { i18n } = useI18n();
    const { uc } = useContexteView();
    //
    return (
        <Composant>
            <Entete>
                <Titre flex="none">{(titre && i18n(`${uc}.${titre}`)) || i18n(`${uc}.titre`)}</Titre>
            </Entete>
            <Corps>
                {children}
            </Corps>
        </Composant>
    );
};

export default Filtre;
