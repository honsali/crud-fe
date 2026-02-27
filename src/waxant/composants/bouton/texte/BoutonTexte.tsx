import type { ButtonProps as AntdButtonProps } from 'antd';
import { Button, Tooltip } from 'antd';
import React from 'react';
import useI18n from 'waxant/noyau/i18n/useI18n';
import useGoToPage from 'waxant/noyau/routes/useGoToPage';
import type { BoutonProps } from '../BoutonProps';
import './BoutonTexte.css';

const BoutonTexte: React.FC<BoutonProps> = (props) => {
    const { nom, contexte, action, page, modele, libelle, icone, inactif, visible = true, rid, toolTip } = props;
    const { i18n } = useI18n();
    const gtp = useGoToPage();
    const label = libelle ?? (nom ? i18n(nom) : '');
    const buttonId = nom ? `bouton${contexte ? '_' + contexte : ''}_${nom}` : undefined;
    const semanticClassNames: AntdButtonProps['classNames'] = {
        root: `waxant-bouton-${props.type}`,
        content: `waxant-bouton-${props.type}__content`,
        icon: `waxant-bouton-${props.type}__icon`,
    };

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
            <Button //
                id={buttonId}
                onClick={executeOnClick}
                onKeyDown={onKeyDown}
                icon={icone ?? undefined}
                loading={!!rid}
                disabled={!!inactif}
                color="default"
                variant="filled"
                classNames={semanticClassNames}
            >
                {label}
            </Button>
        </Tooltip>
    );
};

export default BoutonTexte;
