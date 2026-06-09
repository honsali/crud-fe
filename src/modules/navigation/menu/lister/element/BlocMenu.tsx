import styled from 'styled-components';
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
            color: ${() => '#bbb'};
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
    color: ${() => '#62B01E'};
        a,
        i,
        span {
            color: ${() => '#62B01E'};
        }
        
    }
    .ant-menu-submenu > .ant-menu-submenu-title > .ant-menu-title-content > a {
      display:block;
      width: 100%;
    }
`;

const BlocMenu = ({ children }) => {
    return (
        <Composant>
            {children}
        </Composant>
    );
};

export default BlocMenu;