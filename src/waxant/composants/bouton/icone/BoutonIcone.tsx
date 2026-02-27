import type { ButtonProps as AntdButtonProps } from 'antd';
import { Button, Tooltip } from 'antd';
import React from 'react';
import useI18n from 'waxant/noyau/i18n/useI18n';
import useGoToPage from 'waxant/noyau/routes/useGoToPage';
import type { BoutonProps } from '../BoutonProps';
import './BoutonIcone.css';

const tailleMap = { mini: 'small', moyen: 'middle', large: 'large' } as const;

const BoutonIcone: React.FC<BoutonProps> = (props) => {
    const { nom, contexte, action, page, modele, libelle, icone, inactif, visible = true, rid, taille = 'moyen' } = props;
    const { i18n } = useI18n();
    const gtp = useGoToPage();
    const label = libelle ?? (nom ? i18n(nom) : '');
    const buttonId = nom ? `bouton${contexte ? '_' + contexte : ''}_${nom}` : undefined;
    const semanticClassNames: AntdButtonProps['classNames'] = {
        root: `waxant-bouton-icone-${props.type}`,
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
        <Tooltip placement="top" title={label}>
            <Button //
                id={buttonId}
                size={tailleMap[taille]}
                onClick={executeOnClick}
                onKeyDown={onKeyDown}
                icon={icone ?? undefined}
                loading={!!rid}
                disabled={!!inactif}
                color="default"
                variant="filled"
                classNames={semanticClassNames}
            />
        </Tooltip>
    );
};

export default BoutonIcone;
