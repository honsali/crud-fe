import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, theme, Tooltip } from 'antd';
import useLayoutContext from '../LayoutContext';

const BoutonCollapse = () => {
    const { menuOuvert, setMenuOuvert } = useLayoutContext();
    const { token } = theme.useToken();
    const components = {
        Button: {
            defaultColor: token.colorWarning,
            defaultBg: 'transparent',
            defaultBorderColor: 'transparent',
            defaultHoverColor: token.colorWarning,
            defaultHoverBg: 'transparent',
            defaultHoverBorderColor: token.colorWarning,
            defaultActiveBg: 'transparent',
            defaultActiveColor: token.colorWarning,
            defaultActiveBorderColor: token.colorWarning,
        },
    };
    if (menuOuvert) {
        return (
            <span style={{ position: 'fixed', bottom: 10, left: 200 }}>
                <ConfigProvider theme={{ components }}>
                    <Tooltip title="Reduire">
                        <Button //
                            icon={<MenuFoldOutlined />}
                            onClick={() => setMenuOuvert(false)}
                        />
                    </Tooltip>
                </ConfigProvider>
            </span>
        );
    } else {
        return (
            <span style={{ position: 'fixed', bottom: 10, left: 20 }}>
                <ConfigProvider theme={{ components }}>
                    <Tooltip title="Etendre">
                        <Button //
                            icon={<MenuUnfoldOutlined />}
                            onClick={() => setMenuOuvert(true)}
                        />
                    </Tooltip>
                </ConfigProvider>
            </span>
        );
    }
};
export default BoutonCollapse;
