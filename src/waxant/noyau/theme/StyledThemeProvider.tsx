import { theme } from 'antd';
import { ThemeProvider } from 'styled-components';
const StyledThemeProvider = ({ children }) => {
    const { token } = theme.useToken();

    return <ThemeProvider theme={{ token }}>{children}</ThemeProvider>;
};

export default StyledThemeProvider;
