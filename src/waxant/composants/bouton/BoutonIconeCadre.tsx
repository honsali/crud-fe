import { Button, Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';
import useI18n from 'waxant/noyau/i18n/useI18n';
import useGoToPage from 'waxant/noyau/routes/useGoToPage';
import BoutonProps from './BoutonProps';

const StyledBouton = styled(Button)`
    color: #555;
    background-color: #00000022;
    border: 1px solid #00000022;
    font-size: 12px;
    width: 22px !important;
    height: 22px !important;
    border-radius: 4px;
    &:hover {
        color: ${(props) => props.theme.token.colorPrimary};
        background-color: #555 !important;
        border: 1px solid #555 !important;
    }
    &:focus {
        color: ${(props) => props.theme.token.colorPrimary};
        background-color: #555 !important;
        border: 1px solid #555 !important;
    }
`;

const BoutonIconeCadre: React.FC<BoutonProps> = (props) => {
    const { nom, contexte, action, page, modele, libelle, icone, inactif, visible = true, rid } = props;
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
        <Tooltip placement="top" title={libelle ? libelle : i18n(nom)}>
            <StyledBouton //
                id={`bouton${contexte ? '_' + contexte : ''}_${nom}`}
                size="small"
                onClick={executeOnClick}
                onKeyDown={onKeyDown}
                icon={icone}
                loading={!!rid}
                disabled={!!inactif}
            ></StyledBouton>
        </Tooltip>
    );
};

export default BoutonIconeCadre;
