import { Button, Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';
import useI18n from 'waxant/noyau/i18n/useI18n';
import useGoToPage from 'waxant/noyau/routes/useGoToPage';
import BoutonProps from './BoutonProps';

const StyledBouton = styled(Button) <{ $inactif?: string }>`
    ${({ theme, $inactif }) => {
        const primary = theme.token.colorPrimary;
        if ($inactif) {
            return `
                font-weight: 500;
                color: #aaa  !important;
                background-color: transparent !important;
                border: 2px solid transparent !important;
                border-radius: 4px;
                font-weight: 500;
                cursor: not-allowed;
            `;
        } else {
            return `
                font-weight: 500;
                color: #aaa;
                background-color: transparent !important;
                border: 2px solid transparent !important;
                border-radius: 4px;
                font-weight: 500;
                &:hover  {
                    color: ${primary};
                    text-decoration: underline;
                }
    `;
        }
    }}
`;

const BoutonNormal: React.FC<BoutonProps> = (props) => {
    const { nom, contexte, action, page, modele, libelle, icone, inactif, visible = true, rid, toolTip } = props;
    const { i18n } = useI18n();
    const gtp = useGoToPage();

    const executeOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!inactif && action) {
            action(event);
        } else if (!inactif && page) {
            gtp(page, modele);
        }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === ' ' || event.code === 'Space' || event.key === 'Enter' || event.code === 'Enter') {
            event.preventDefault();
        }
    };

    if (!visible) {
        return null;
    }

    return (
        <Tooltip placement="top" title={toolTip || inactif}>
            <StyledBouton //
                id={`bouton${contexte ? '_' + contexte : ''}_${nom}`}
                onClick={executeOnClick}
                onKeyDown={onKeyDown}
                icon={icone}
                loading={!!rid}
                disabled={!!inactif}
                type="default"
                $inactif={inactif}
            >
                {libelle ? libelle : i18n(nom)}
            </StyledBouton>
        </Tooltip>
    );
};

export default BoutonNormal;
