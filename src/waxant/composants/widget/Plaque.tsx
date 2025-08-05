import { Tag } from 'antd';
import styled from 'styled-components';

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

const Plaque = ({ type = null, style = null, couleur = null, action = null, children }) => {

    const getClassName = () => {
        return (type ? type : 'principale') + (action ? ' clickable' : '');
    };
    const getStyle = () => {
        if (couleur) {
            return style ? { ...style, backgroundColor: couleur } : { backgroundColor: couleur };
        }
        return style;
    };
    const actionOnClick = (event) => {
        if (action) {
            event.preventDefault();
            event.stopPropagation();
            action();
        }
    };

    return (
        <Composant style={getStyle()} className={getClassName()} onClick={actionOnClick}>
            {children}
        </Composant>
    );
};

export default Plaque;
