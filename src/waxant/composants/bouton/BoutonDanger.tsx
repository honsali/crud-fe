import { Button, Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';
import useI18n from 'waxant/noyau/i18n/useI18n';
import useGoToPage from 'waxant/noyau/routes/useGoToPage';
import BoutonProps from './BoutonProps';

const StyledBouton = styled(Button) <{ $inactif?: string }>`
    ${({ theme, $inactif }) => {
        const primary = theme.token.colorError;
        if ($inactif) {
            return `
                font-weight: 500;
                background-color: transparent;
                border: 2px solid #aaa;
                cursor: not-allowed;
                & span {
                    color: #999 ;
                }
            `;
        } else {
            return `
                position: relative;
                overflow: hidden;
                color: #fff;
                background-color: transparent;
                border: 2px solid ${primary};
                border-radius: 4px;
                font-weight: 500;
                &:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: ${primary};
                    transition: width 0.3s ease;
                    z-index: 0;
                }
                &:hover{
                    background-color: #fff !important;
                    border: 2px solid ${primary} !important;
                }

                &:hover::after {
                    width: 0%;
                    transition: width 0.7s ease;
                }

                & span {
                    color: #fff;
                    position: relative;
                    z-index: 1;  
                }

                &:hover > span, &:hover > .anticon {
                    color: ${primary};
                }
    `;
        }
    }}
`;

const BoutonDanger: React.FC<BoutonProps> = (props) => {
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

export default BoutonDanger;
