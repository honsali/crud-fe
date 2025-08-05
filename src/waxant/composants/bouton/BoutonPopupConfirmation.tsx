import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';
import useI18n from 'waxant/noyau/i18n/useI18n';
import BoutonProps from './BoutonProps';

const BoutonActif = styled(Button)`
    position: relative;
    overflow: hidden;
    color: #fff;
    background-color: transparent;
    border: 2px solid ${(props) => props.theme.token.colorWarning} !important;
    border-radius: 4px;
    font-weight: 500;
    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${(props) => props.theme.token.colorWarning};
        color: #fff;
        transition: width 0.3s ease;
        z-index: 0;
    }

    &:hover::after {
        width: 0;
        transition: width 0.7s ease;
        color: ${(props) => props.theme.token.colorWarning};
    }

    & span {
        position: relative;
        z-index: 1;
        color: #fff;
    }

    &:hover > span,
    &:hover > .anticon {
        color: ${(props) => props.theme.token.colorWarning};
    }
`;

const BoutonPopupConfirmation: React.FC<BoutonProps> = (props) => {
    const { nom, action, rid } = props;
    const { i18n } = useI18n();

    const executeOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        action(event);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === ' ' || event.code === 'Space' || event.key === 'Enter' || event.code === 'Enter') {
            event.preventDefault();
        }
    };

    return (
        <BoutonActif //
            onClick={executeOnClick}
            onKeyDown={onKeyDown}
            loading={!!rid}
            type="default"
        >
            {i18n(nom)}
        </BoutonActif>
    );
};

export default BoutonPopupConfirmation;
