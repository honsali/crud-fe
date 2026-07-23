import axios from 'axios';

const AUTH_TOKEN_KEY = 'auth_token';

type UnauthorizedCallback = () => void;

const initAxios = (apiTimeout: number, onUnauthorized: UnauthorizedCallback) => {
    axios.defaults.timeout = apiTimeout;
    axios.defaults.paramsSerializer = {
        encode: (value) => encodeURIComponent(value),
    };

    const requestInterceptor = axios.interceptors.request.use((config) => {
        const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    const responseInterceptor = axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401 && sessionStorage.getItem(AUTH_TOKEN_KEY)) {
                onUnauthorized();
            }
            return Promise.reject(error);
        },
    );

    return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
    };
};

export default initAxios;
