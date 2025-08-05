import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { useContexteAuth } from 'waxant';
import PageAuth from '../auth/PageAuth';
import { listeRoutes } from './PageDefinition';
import PageNotFound from './PageNotFound';
import PrivateRoute from './PrivateRoute';

export const AppRoutes = ({ config, children }) => {
    const { role, isAuthenticated } = useContexteAuth();
    const [routes, setRoutes] = useState(null);

    useEffect(() => {
        if (role && isAuthenticated) {
            const domaine = config.mapDomaine[role];
            if (domaine) {
                const routesList = listeRoutes(domaine.listeModule);
                setRoutes(routesList);
            }
        } else {
            setRoutes(null);
        }
    }, [role, isAuthenticated, config.mapDomaine]);

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
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
