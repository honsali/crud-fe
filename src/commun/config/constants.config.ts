declare global {
    var __CRUD_CONFIG__: {
        apiUrl?: string;
    } | undefined;
}

const runtimeApiUrl = globalThis.__CRUD_CONFIG__?.apiUrl?.trim();
const buildApiUrl = typeof process !== 'undefined'
    ? process.env.BUN_PUBLIC_API_URL?.trim()
    : undefined;

export const API_URL = (runtimeApiUrl || buildApiUrl || 'http://localhost:8080/api').replace(/\/+$/, '');

export enum APP_MODULES {
}

export enum APP_EVENT {
}
