import { Tag } from 'antd';
import styled from 'styled-components';
import type { CSSProperties, ReactNode } from 'react';

const Composant = styled(Tag)`
    color: #fff;
    border: none;
    &.principale {
        background: ${(props) => props.theme.token.colorPrimary};
        &:hover {
            background: ${(props) => props.theme.token.colorPrimary};
        }
    }
    &.secondaire {
        background: ${(props) => props.theme.token.colorWarning};
        &:hover {
            background: ${(props) => props.theme.token.colorWarning};
        }
    }
    &.clickable {
        cursor: pointer;
    }
`;

type PlaqueProps = {
    type?: string | null;
    style?: CSSProperties;
    couleur?: string | null;
    action?: (() => void) | null;
    children?: ReactNode;
};

const Plaque = ({ type = null, style, couleur = null, action = null, children }: PlaqueProps) => {

    const getClassName = () => {
        return (type ? type : 'principale') + (action ? ' clickable' : '');
    };
    const getStyle = () => {
        if (couleur) {
            return { ...(style ?? {}), backgroundColor: couleur };
        }
        return style ?? undefined;
    };
    const actionOnClick = (event) => {
        if (!action) return;
        event.preventDefault();
        event.stopPropagation();
        action();
    };

    return (
        <Composant style={getStyle()} className={getClassName()} onClick={actionOnClick}>
            {children}
        </Composant>
    );
};

export default Plaque;
