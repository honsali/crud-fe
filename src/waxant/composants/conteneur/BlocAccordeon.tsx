import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useContexteAccordeon from 'waxant/noyau/contexte/ContexteAccordeon';
import useContexteView from 'waxant/noyau/contexte/ContexteView';
import useI18n from 'waxant/noyau/i18n/useI18n';

const Composant = styled.div`
    &:first-child  > .closed  {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
    &:first-child  > .opened  {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
    &:last-child   >  .closed{
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }
`;

const Entete = styled.div<{ $opened: boolean, $inactif: boolean }>`
    
    padding: 8px 20px 4px 5px;
    display: flex;
    flex-direction: row;
    cursor: pointer;

    ${({ $opened, $inactif }) => {
        if ($inactif) {
            return `
                color: #ccc;
                background-color: #e9e5e0;
                border-bottom: 2px solid #ccc;
                cursor: not-allowed;
            `;
        } else if (!$opened) {
            return `
                color: #777;
                background-color: #e9e5e0;
                border-bottom: 2px solid #ccc;
                &:hover {
                    color: #555;
                    background-color: #2277BB;
                }
            `;
        } else {
            return `
                color: #555;
                background-color: #2277BB;
                border-bottom: 2px solid #2277BB;
            `;
        }
    }}
`;

const Corps = styled.div`
    background-color: #f5f3f0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-top: 1px solid #999;
    border-bottom: 2px solid #ccc;
`;

const Titre = styled.div`
    flex: auto;
    font-weight: 700;
    padding-top: 2px;
`;


const BlocAccordeon = ({ nom = null, titre = null, inactif = false, children }) => {
    const { i18n } = useI18n();
    const { uc } = useContexteView();
    const { ouvert, setOuvert } = useContexteAccordeon();
    const [opened, setOpened] = useState(false);

    const toggle = () => {
        setOpened(!inactif && !opened);
        setOuvert(nom);
    };

    useEffect(() => {
        const test: boolean = !inactif && (ouvert === nom);
        setOpened(test);
    }, [ouvert]);

    return (
        <Composant id={`bloc_${nom}`} >
            <Entete onClick={toggle} $opened={opened} $inactif={inactif} className={opened ? 'opened' : 'closed'}>
                <Titre>{titre || i18n(`${uc}.bloc.${nom}`)}</Titre>
                {opened ? <UpOutlined /> : <DownOutlined />}
            </Entete>
            <Corps style={{ display: opened ? 'flex' : 'none' }} className="corps">
                {children}
            </Corps>
        </Composant>
    );
};

export default BlocAccordeon; 
