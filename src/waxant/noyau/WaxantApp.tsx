import { useEffect } from 'react';
import { AuthProvider } from './auth/ContexteAuth';
import initAxios from './axios/axios.config';
import { type ConfigAppType, ContexteAppProvider } from './contexte/ContexteApp';
import { ContexteI18nProvider } from './i18n/ContexteI18n';
import { DynamicStoreProvider } from './redux/DynamicStoreContext';
import { AppRoutes } from './routes/AppRoutes';
import ErrorBoundary from './routes/ErrorBoundary';
import AntdThemeProvider from './theme/AntdThemeProvider';

const WaxantApp = ({ config, children }: { config: ConfigAppType; children: React.ReactNode }) => {

    useEffect(() => {
        initAxios(config.apiTimeout);
    }, [config.apiTimeout]);

    return (
        <AuthProvider config={config}>
            <AppRoutes config={config}>
                <DynamicStoreProvider config={config}>
                    <ErrorBoundary>
                        <ContexteAppProvider config={config}>
                            <AntdThemeProvider config={config}>
                                <ContexteI18nProvider config={config}>
                                    {children}
                                </ContexteI18nProvider>
                            </AntdThemeProvider>
                        </ContexteAppProvider>
                    </ErrorBoundary>
                </DynamicStoreProvider>
            </AppRoutes>
        </AuthProvider>
    );
};

export default WaxantApp;
