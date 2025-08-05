import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import useContexteView from 'waxant/noyau/contexte/ContexteView';
import useI18n from 'waxant/noyau/i18n/useI18n';

const Composant = styled.div`
    margin-bottom: 20px;
`;

const Entete = styled.div<{ $opened: boolean }>`
    color: #555;
    background-color: #2277BB;
    padding: 4px 5px 4px 5px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    display: flex;
    flex-direction: row;
    ${({ $opened }) => {
        if (!$opened) {
            return `
                border-bottom-left-radius: 4px;
                border-bottom-right-radius: 4px;
            `;
        }
    }}
`;

const Corps = styled(Row)`
    background-color: #f5f3f0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-top: 1px solid #999;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
`;

const Titre = styled.div`
    flex: auto;
    font-weight: 700;
    padding-top: 2px;
`;

const OpenClose = styled.div`
    cursor: pointer;
    color: #555;
    flex: none;
    padding-top: 2px;
    &:hover {
        color: #555;
    }
`;

const PanneauEtendable = ({ titre = null, libelle = null, open = false, children }) => {
    const { i18n } = useI18n();
    const { uc } = useContexteView();
    const [opened, setOpened] = useState(open === true);

    const toggle = () => {
        setOpened(!opened);
    };

    return (
        <Composant>
            <Entete onClick={toggle} $opened={opened}>
                <Titre>{libelle || i18n(uc + '.' + titre)}</Titre>
                {!open && <OpenClose>{opened ? <DownOutlined /> : <RightOutlined />}</OpenClose>}
            </Entete>
            <Corps style={{ display: opened ? 'block' : 'none' }}>
                <Col span={24}>{children}</Col>
            </Corps>
        </Composant>
    );
};

export default PanneauEtendable;
