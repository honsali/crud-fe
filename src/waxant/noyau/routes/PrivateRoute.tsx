import type { ReactNode } from 'react';
import useContexteAuth from '../auth/ContexteAuth';

interface PrivateRouteProps {
    children: ReactNode;
    fallback?: ReactNode;
    requiredRole?: string;
    requiredRoles?: string[];
}

const PrivateRoute = ({
    children,
    fallback = null,
    requiredRole,
    requiredRoles
}: PrivateRouteProps) => {
    const { isAuthenticated, role, user } = useContexteAuth();

    // If not authenticated, don't render children
    if (!isAuthenticated) {
        return <>{fallback}</>;
    }

    // If specific role is required, check if user has it
    if (requiredRole && role !== requiredRole) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
                flexDirection: 'column',
                color: '#6c757d'
            }}>
                <h3>Access Denied</h3>
                <p>You don't have permission to access this page.</p>
                <p>Required role: <strong>{requiredRole}</strong></p>
                <p>Your role: <strong>{role || 'None'}</strong></p>
            </div>
        );
    }

    // If multiple roles are allowed, check if user has one of them
    if (requiredRoles && requiredRoles.length > 0 && !requiredRoles.includes(role || '')) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
                flexDirection: 'column',
                color: '#6c757d'
            }}>
                <h3>Access Denied</h3>
                <p>You don't have permission to access this page.</p>
                <p>Required roles: <strong>{requiredRoles.join(', ')}</strong></p>
                <p>Your role: <strong>{role || 'None'}</strong></p>
            </div>
        );
    }

    // User is authenticated and has required permissions
    return <>{children}</>;
};

export default PrivateRoute;
