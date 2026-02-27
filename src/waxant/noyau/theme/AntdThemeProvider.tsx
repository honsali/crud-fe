import { App, ConfigProvider } from 'antd';
import { type ConfigAppType } from '../contexte/ContexteApp';
import StyledThemeProvider from './StyledThemeProvider';
// eslint-disable-next-line no-unused-vars
import locale from 'antd/locale/fr_FR';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

const AntdThemeProvider = ({ config, children }: { config: ConfigAppType; children: React.ReactNode }) => {
    const { theme, langue } = config;
    dayjs.locale('fr');

    return (
        <ConfigProvider theme={theme} locale={locale}>
            <App>
                <StyledThemeProvider>{children}</StyledThemeProvider>
            </App>
        </ConfigProvider>
    );
};

export default AntdThemeProvider;
