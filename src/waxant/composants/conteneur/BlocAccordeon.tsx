import { DownOutlined, UpOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';
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
                    background-color: #3F72AF;
                }
            `;
        } else {
            return `
                color: #555;
                background-color: #3F72AF;
                border-bottom: 2px solid #3F72AF;
            `;
        }
    }}
`;

const Corps = styled.div`
    background-color: #F5F7FB;
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


type BlocAccordeonProps = {
    nom?: string | null;
    titre?: string | null;
    inactif?: boolean;
    children?: ReactNode;
};

const BlocAccordeon = ({ nom = null, titre = null, inactif = false, children }: BlocAccordeonProps) => {
    const { i18n } = useI18n();
    const { uc } = useContexteView();
    const { ouvert, setOuvert } = useContexteAccordeon();
    const [opened, setOpened] = useState(false);
    const safeNom = nom ?? '';

    const toggle = () => {
        setOpened(!inactif && !opened);
        setOuvert?.(safeNom || undefined);
    };

    useEffect(() => {
        const test: boolean = !inactif && (ouvert === safeNom);
        setOpened(test);
    }, [ouvert, inactif, safeNom]);

    return (
        <Composant id={`bloc_${safeNom}`} >
            <Entete onClick={toggle} $opened={opened} $inactif={inactif} className={opened ? 'opened' : 'closed'}>
                <Titre>{titre || i18n(`${uc}.bloc.${safeNom}`)}</Titre>
                {opened ? <UpOutlined /> : <DownOutlined />}
            </Entete>
            <Corps style={{ display: opened ? 'flex' : 'none' }} className="corps">
                {children}
            </Corps>
        </Composant>
    );
};

export default BlocAccordeon; 
