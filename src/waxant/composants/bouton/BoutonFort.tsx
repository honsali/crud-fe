import { Button, Tooltip, theme } from 'antd';
import React from 'react';
import styled from 'styled-components';
import useI18n from 'waxant/noyau/i18n/useI18n';
import useGoToPage from 'waxant/noyau/routes/useGoToPage';
import BoutonProps from './BoutonProps';

const StyledBouton = styled(Button) <{ $couleurActive?: string, $couleurHover?: string, $inactif?: string }>`
    ${({ $couleurActive, $couleurHover, $inactif }) => {
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
                color: ${$couleurHover};
                background-color: transparent;
                border: 2px solid ${$couleurActive};
                border-radius: 4px;
                font-weight: 500;
                &:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: ${$couleurActive};
                    transition: width 0.3s ease;
                    z-index: 0;
                }
                &:hover{
                    background-color:  ${$couleurHover} !important;
                    border: 2px solid ${$couleurActive} !important;
                }

                &:hover::after {
                    width: 0%;
                    transition: width 0.7s ease;
                }

                & span {
                    color:  ${$couleurHover};
                    position: relative;
                    z-index: 1;  
                }

                &:hover > span, &:hover > .anticon {
                    color: ${$couleurActive};
                }
    `;
        }
    }}
`;

const BoutonFort: React.FC<BoutonProps> = (props) => {
    const { nom, contexte, action, page, modele, libelle, icone, couleur = 'fort', inactif, visible = true, rid, toolTip } = props;
    const { i18n } = useI18n();
    const gtp = useGoToPage();
    const { token } = theme.useToken();
    const { colorPrimary, colorError } = token;
    const mapCouleurActive = { 'fort': colorPrimary, 'danger': colorError, 'normal': '#fff' };
    const mapCouleurHover = { 'fort': '#fff', 'danger': '#fff', 'normal': '#999' };

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
                $couleurActive={mapCouleurActive[couleur]}
                $couleurHover={mapCouleurHover[couleur]}
                $inactif={inactif}
            >
                {libelle ? libelle : i18n(nom)}
            </StyledBouton>
        </Tooltip>
    );
};

export default BoutonFort;
