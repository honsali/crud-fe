import { useLayoutEffect } from 'react';
import { AuthProvider } from './auth/ContexteAuth';
import useContexteAuth from './auth/ContexteAuth';
import initAxios from './axios/axios.config';
import { type ConfigAppType, ContexteAppProvider } from './contexte/ContexteApp';
import { ContexteI18nProvider } from './i18n/ContexteI18n';
import { DynamicStoreProvider } from './redux/DynamicStoreContext';
import { AppRoutes } from './routes/AppRoutes';
import ErrorBoundary from './routes/ErrorBoundary';
import AntdThemeProvider from './theme/AntdThemeProvider';

const AxiosConfiguration = ({ apiTimeout }: { apiTimeout: number }) => {
    const { logout } = useContexteAuth();

    useLayoutEffect(() => initAxios(apiTimeout, logout), [apiTimeout, logout]);
    return null;
};

const WaxantApp = ({ config, children }: { config: ConfigAppType; children: React.ReactNode }) => {
    return (
        <AuthProvider config={config}>
            <AxiosConfiguration apiTimeout={config.apiTimeout} />
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
