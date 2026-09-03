import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useContexteAuth from './ContexteAuth';

interface LoginResponse {
    accessToken?: string;
}

interface ApiError {
    message?: string;
}

const PageAuth = () => {
    const { api_url, login } = useContexteAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (event: React.SubmitEvent) => {
        event.preventDefault();
        setError('');

        if (!username.trim() || !password.trim()) {
            setError("Saisissez le nom d'utilisateur et le mot de passe.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${api_url}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username.trim(),
                    password,
                }),
            });

            const data = await response.json().catch(() => ({})) as LoginResponse & ApiError;
            if (!response.ok) {
                throw new Error(data.message || 'Authentification impossible.');
            }
            if (!data.accessToken) {
                throw new Error("Le serveur n'a pas retourné de jeton d'accès.");
            }

            const success = await login(data.accessToken);
            if (!success) {
                throw new Error("Le jeton retourné est invalide ou son rôle n'est pas pris en charge.");
            }

            navigate('/', { replace: true });
        } catch (exception) {
            setError(exception instanceof Error ? exception.message : 'Authentification impossible.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
        }}>
            <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                minWidth: '300px',
                maxWidth: '400px',
                width: '100%',
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>
                    Connexion
                </h2>
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                            Nom d&apos;utilisateur
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            disabled={isLoading}
                            maxLength={100}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '14px',
                                boxSizing: 'border-box',
                            }}
                            autoComplete="username"
                            autoFocus
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            disabled={isLoading}
                            maxLength={256}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '14px',
                                boxSizing: 'border-box',
                            }}
                            autoComplete="current-password"
                        />
                    </div>
                    {error && (
                        <div role="alert" style={{
                            color: '#842029',
                            marginBottom: '1rem',
                            padding: '0.75rem',
                            backgroundColor: '#f8d7da',
                            border: '1px solid #f5c2c7',
                            borderRadius: '4px',
                            fontSize: '14px',
                        }}>
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: isLoading ? '#6c757d' : '#1677ff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            fontSize: '16px',
                            fontWeight: 500,
                        }}
                    >
                        {isLoading ? 'Connexion…' : 'Se connecter'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PageAuth;
