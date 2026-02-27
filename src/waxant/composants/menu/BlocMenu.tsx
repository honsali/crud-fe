import styled from 'styled-components';
import MenuModule from './MenuModule';
const Composant = styled.div`
    padding-bottom:50px;
    .ant-menu-item {
        font-weight: 500;
    }
    .ant-menu-submenu {
        font-weight: 500;
    }
    .ant-menu-submenu > div {
        a,
        i,
        span {
            color: ${() => '#3F72AF'};
        }
        
    }

    .ant-menu-submenu.ant-menu-submenu-open.ant-menu-submenu-selected> div {
        a,
        i,
        span {
            color: ${() => '#DBE2EF'};
        }
        
    }
    .ant-menu-submenu.ant-menu-submenu-active> div {
    color: ${() => '#DBE2EF'};
        a,
        i,
        span {
            color: ${() => '#DBE2EF'};
        }
        
    }
    .ant-menu-submenu > .ant-menu-submenu-title > .ant-menu-title-content > a {
      display:block;
      width: 100%;
    }
`;

const BlocMenu = ({ ouvert }) => {
    return (
        <Composant>
            <MenuModule ouvert={ouvert} />
        </Composant>
    );
};

export default BlocMenu;
