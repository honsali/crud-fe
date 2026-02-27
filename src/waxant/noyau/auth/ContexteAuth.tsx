import _ from 'lodash';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { type ConfigAppType } from '../contexte/ContexteApp';

interface IContexteAuthProps {
    user: string | null;
    role: string | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string, accountData: any) => Promise<boolean>;
    logout: () => void;
    refreshToken: () => Promise<boolean>;
}

interface JWTPayload {
    preferred_username: string;
    exp: number;
    iat: number;
    [key: string]: any;
}

interface AuthProviderProps {
    children: ReactNode;
    config: ConfigAppType;
    onLogout?: () => void;
}

const ContexteAuth = createContext({} as IContexteAuthProps);

// JWT utility functions
const decodeJWT = (token: string): JWTPayload | null => {
    try {
        const payload = token.split('.')[1];
        if (!payload) {
            return null;
        }
        return JSON.parse(atob(payload));
    } catch (error) {
        console.error('Failed to decode JWT:', error);
        return null;
    }
};

const isTokenExpired = (token: string): boolean => {
    const payload = decodeJWT(token);
    if (!payload) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
};

const isTokenExpiringSoon = (token: string, bufferMinutes: number = 5): boolean => {
    const payload = decodeJWT(token);
    if (!payload) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    const bufferTime = bufferMinutes * 60;
    return payload.exp < (currentTime + bufferTime);
};

export const AuthProvider = ({ children, config, onLogout }: AuthProviderProps) => {
    const [user, setUser] = useState<string | null>(() => sessionStorage.getItem('auth_user'));
    const [role, setRole] = useState<string | null>(() => sessionStorage.getItem('auth_role'));
    const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('auth_token'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Authentication functions
    const login = async (newToken: string, accountData: any): Promise<boolean> => {
        try {
            if (isTokenExpired(newToken)) {
                console.error('Token is expired');
                return false;
            }

            const payload = decodeJWT(newToken);
            if (!payload) {
                console.error('Invalid token format');
                return false;
            }

            // Find matching role
            let roleNormalise: string | null = null;
            const roleTrouve = _.some(accountData.authorities, (r) => {
                roleNormalise = config.mapRole[r] ?? null;
                return !!roleNormalise;
            });

            if (!roleTrouve || !roleNormalise) {
                console.error('No valid role found in token');
                return false;
            }

            // Store authentication data
            sessionStorage.setItem('auth_token', newToken);
            sessionStorage.setItem('auth_user', payload.sub);
            sessionStorage.setItem('auth_role', roleNormalise);

            // Update state
            setToken(newToken);
            setUser(payload.sub);
            setRole(roleNormalise);
            setIsAuthenticated(true);

            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const logout = () => {
        // Clear session storage
        sessionStorage.removeItem('auth_token');
        sessionStorage.removeItem('auth_user');
        sessionStorage.removeItem('auth_role');

        // Clear state
        setToken(null);
        setUser(null);
        setRole(null);
        setIsAuthenticated(false);

        // Call external logout handler if provided
        if (onLogout) {
            onLogout();
        } else {
            // Default redirect behavior
            const redirectUri = window.location.origin + '/';
            window.location.href = redirectUri;
        }
    };

    const refreshToken = async (): Promise<boolean> => {
        try {
            if (!token) return false;

            if (isTokenExpired(token)) {
                logout();
                return false;
            }

            // If token is expiring soon, you might want to refresh it
            if (isTokenExpiringSoon(token)) {
                // Call your refresh token API endpoint here
                // const response = await fetch('/api/auth/refresh', {
                //     method: 'POST',
                //     headers: { 'Authorization': `Bearer ${token}` }
                // });
                // if (response.ok) {
                //     const { token: newToken } = await response.json();
                //     return await login(newToken);
                // }

                console.warn('Token is expiring soon, consider refreshing');
            }

            return true;
        } catch (error) {
            console.error('Token refresh failed:', error);
            logout();
            return false;
        }
    };

    // Initialize authentication state
    useEffect(() => {
        const initAuth = async () => {
            const storedToken = sessionStorage.getItem('auth_token');
            const storedUser = sessionStorage.getItem('auth_user');
            const storedRole = sessionStorage.getItem('auth_role');

            if (storedToken && storedUser && storedRole) {
                if (isTokenExpired(storedToken)) {
                    console.log('Stored token is expired, logging out');
                    logout();
                } else {
                    setToken(storedToken);
                    setUser(storedUser);
                    setRole(storedRole);
                    setIsAuthenticated(true);
                }
            }
        };

        initAuth();
    }, []);

    // Set up token refresh interval
    useEffect(() => {
        if (!token || !isAuthenticated) return;

        const interval = setInterval(async () => {
            await refreshToken();
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [token, isAuthenticated]);

    return (
        <ContexteAuth.Provider value={{
            user,
            role,
            token,
            isAuthenticated,
            login,
            logout,
            refreshToken
        }}>
            {children}
        </ContexteAuth.Provider>
    );
};

const useContexteAuth = () => {
    const context = useContext(ContexteAuth);
    if (context === undefined) {
        throw new Error('useContexteAuth must be used within an AuthProvider');
    }
    return context;
};

export default useContexteAuth;
