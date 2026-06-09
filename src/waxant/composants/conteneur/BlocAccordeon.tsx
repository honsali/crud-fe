import { DownOutlined, UpOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useContexteAccordeon from '../../noyau/contexte/ContexteAccordeon';
import useContexteView from '../../noyau/contexte/ContexteView';
import useI18n from '../../noyau/i18n/useI18n';

const Composant = styled.div`
    &:first-child  > .closed  {
        border-top: 1px solid #ddd;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
    &:first-child  > .opened  {
        border-top: 1px solid #ddd;
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
                color: red;
                background-color: #f5f3f0;
                border: 1px solid #ddd;
                border-top:none;
                cursor: not-allowed;
            `;
        } else if (!$opened) {
            return `
                color: #777;
                background-color: #f5f3f0;
                border: 1px solid #ddd;
                border-top:none;
                &:hover {
                    color: #fff;
                    background-color: #3F72AF;
                }
            `;
        } else {
            return `
                color: #fff;
                background-color: #3F72AF;
                border: 1px solid #3F72AF;
                border-top:none;
            `;
        }
    }}
`;

const Corps = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-top:none;
`;

const Titre = styled.div`
    flex: auto;
    font-weight: 700;
    padding: 5px 0 3px 5px;
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
