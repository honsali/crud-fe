import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { ConfigAppType } from '../contexte/ContexteApp';

interface IContexteAuthProps {
    api_url: string;
    user: string | null;
    role: string | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => Promise<boolean>;
    logout: () => void;
}

interface JwtPayload {
    sub?: unknown;
    role?: unknown;
    exp?: unknown;
}

interface AuthSession {
    user: string;
    role: string;
    token: string;
    expiresAt: number;
}

interface AuthProviderProps {
    children: ReactNode;
    config: ConfigAppType;
    onLogout?: () => void;
}

const AUTH_TOKEN_KEY = 'auth_token';
const MAX_TIMEOUT_MS = 2_147_483_647;

const ContexteAuth = createContext<IContexteAuthProps | undefined>(undefined);

const decodeJwt = (token: string): JwtPayload | null => {
    try {
        const encodedPayload = token.split('.')[1];
        if (!encodedPayload) {
            return null;
        }

        const base64 = encodedPayload.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(encodedPayload.length / 4) * 4, '=');
        const bytes = Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
        return JSON.parse(new TextDecoder().decode(bytes)) as JwtPayload;
    } catch {
        return null;
    }
};

const createSession = (token: string, mapRole: Record<string, string>): AuthSession | null => {
    const payload = decodeJwt(token);
    if (!payload || typeof payload.sub !== 'string' || !payload.sub.trim()) {
        return null;
    }
    if (typeof payload.role !== 'string') {
        return null;
    }
    if (typeof payload.exp !== 'number' || !Number.isFinite(payload.exp)) {
        return null;
    }

    const role = mapRole[payload.role];
    const expiresAt = payload.exp * 1000;
    if (!role || expiresAt <= Date.now()) {
        return null;
    }

    return {
        user: payload.sub,
        role,
        token,
        expiresAt,
    };
};

const clearStoredSession = () => {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
};

export const AuthProvider = ({ children, config, onLogout }: AuthProviderProps) => {
    const [session, setSession] = useState<AuthSession | null>(() => {
        const storedToken = sessionStorage.getItem(AUTH_TOKEN_KEY);
        const storedSession = storedToken ? createSession(storedToken, config.mapRole) : null;
        if (!storedSession) {
            clearStoredSession();
        }
        return storedSession;
    });

    const login = useCallback(async (newToken: string): Promise<boolean> => {
        const newSession = createSession(newToken, config.mapRole);
        if (!newSession) {
            return false;
        }

        clearStoredSession();
        sessionStorage.setItem(AUTH_TOKEN_KEY, newToken);
        setSession(newSession);
        return true;
    }, [config.mapRole]);

    const logout = useCallback(() => {
        clearStoredSession();
        setSession(null);
        onLogout?.();
    }, [onLogout]);

    useEffect(() => {
        if (!session) {
            return;
        }

        const remainingLifetime = session.expiresAt - Date.now();
        if (remainingLifetime <= 0) {
            logout();
            return;
        }

        const timeout = window.setTimeout(logout, Math.min(remainingLifetime, MAX_TIMEOUT_MS));
        return () => window.clearTimeout(timeout);
    }, [logout, session]);

    return (
        <ContexteAuth.Provider value={{
            api_url: config.api_url,
            user: session?.user ?? null,
            role: session?.role ?? null,
            token: session?.token ?? null,
            isAuthenticated: session !== null,
            login,
            logout,
        }}>
            {children}
        </ContexteAuth.Provider>
    );
};

const useContexteAuth = () => {
    const context = useContext(ContexteAuth);
    if (!context) {
        throw new Error('useContexteAuth must be used within an AuthProvider');
    }
    return context;
};

export default useContexteAuth;
