import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Tooltip } from 'antd';
import React, { useContext } from 'react';
import styled from 'styled-components';
import useContexteView from 'waxant/noyau/contexte/ContexteView';
import useI18n from 'waxant/noyau/i18n/useI18n';
import useGoToPage from 'waxant/noyau/routes/useGoToPage';
import BoutonProps from './BoutonProps';

const StyledBouton = styled(Button)`
    ${({ theme }) => {
        const primary = theme.token.colorPrimary;
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
    }}
`;

const BoutonRetour: React.FC<BoutonProps> = (props) => {
    const { nom, contexte, page, modele, libelle } = props;
    const { i18n } = useI18n();
    const { uc } = useContexteView();
    const gtp = useGoToPage();
    const { direction } = useContext(ConfigProvider.ConfigContext);

    const executeOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        gtp(page, modele);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === ' ' || event.code === 'Space' || event.key === 'Enter' || event.code === 'Enter') {
            event.preventDefault();
        }
    };

    return (
        <Tooltip placement="top" title={libelle ? libelle : i18n(uc + '.retour' + page.key)}>
            <StyledBouton //
                id={`bouton${contexte ? '_' + contexte : ''}_${nom}`}
                onClick={executeOnClick}
                onKeyDown={onKeyDown}
                icon={direction === 'rtl' ? <RightOutlined /> : <LeftOutlined />}
                type="link"
            >
                {i18n('retour')}
            </StyledBouton>
        </Tooltip>
    );
};

export default BoutonRetour;
