import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { useContexteAuth } from 'waxant';
import PageAuth from '../auth/PageAuth';
import type { ConfigAppType } from '../contexte/ContexteApp';
import { listeRoutes } from './PageDefinition';
import PageNotFound from './PageNotFound';
import PrivateRoute from './PrivateRoute';

type AppRoutesProps = {
    config: ConfigAppType;
    children: ReactNode;
};

export const AppRoutes = ({ config, children }: AppRoutesProps) => {
    const { role, isAuthenticated } = useContexteAuth();
    const [routes, setRoutes] = useState<ReactNode>(null);

    useEffect(() => {
        if (role && isAuthenticated) {
            const domaine = config.mapDomaine[role];
            if (domaine) {
                const routesList = listeRoutes(domaine.listeModule ?? []);
                setRoutes(routesList);
            }
        } else {
            setRoutes(null);
        }
    }, [role, isAuthenticated, config.mapDomaine]);

    return (
        <BrowserRouter basename="/">
            <Routes>
                {isAuthenticated && role ? (
                    <Route path="/" element={<PrivateRoute>{children}</PrivateRoute>}>
                        {routes}
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                ) : (
                    <Route path="*" element={<PageAuth />} />
                )}
            </Routes>
        </BrowserRouter>
    );
};
