import axios from 'axios';

// File d'attente pour stocker les requêtes en attente pendant le rafraîchissement du token
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Type pour les callbacks de refresh token
type RefreshTokenCallback = () => Promise<string | null>;

let refreshTokenCallback: RefreshTokenCallback | null = null;

export const setRefreshTokenCallback = (callback: RefreshTokenCallback) => {
    refreshTokenCallback = callback;
};

const initAxios = (apiTimeout: number) => {
    axios.defaults.timeout = apiTimeout;

    axios.defaults.paramsSerializer = {
        encode: (params) => {
            return encodeURI(params);
        },
    };

    const onRequestSuccess = (config: any) => {
        const item = window.sessionStorage.getItem('auth_token');
        const token = item ? (item.startsWith('"') ? JSON.parse(item) : item) : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    };

    const onResponseSuccess = (response: any) => response;

    const onResponseError = async (error: any) => {
        const originalRequest = error.config;

        // Si l'erreur est 401 et que nous n'avons pas déjà essayé de rafraîchir le token
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Si un rafraîchissement est déjà en cours, mettre la requête en file d'attente
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return axios(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                if (refreshTokenCallback) {
                    // Utiliser le callback personnalisé pour rafraîchir le token
                    const newToken = await refreshTokenCallback();

                    if (newToken) {
                        // Mettre à jour l'en-tête d'autorisation
                        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                        // Traiter la file d'attente avec le nouveau token
                        processQueue(null, newToken);

                        return axios(originalRequest);
                    } else {
                        throw new Error('Failed to refresh token');
                    }
                } else {
                    throw new Error('No refresh token callback available');
                }
            } catch (refreshError) {
                // En cas d'échec, traiter la file d'attente avec l'erreur
                processQueue(refreshError, null);

                // Déclencher la déconnexion via un événement personnalisé
                window.dispatchEvent(new CustomEvent('auth:logout'));

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    };

    axios.interceptors.request.use(onRequestSuccess);
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default initAxios;
