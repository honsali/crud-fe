import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

interface RuntimeConfig {
    apiUrl?: string;
}

const loadRuntimeConfig = async () => {
    try {
        const response = await fetch('/app-config.json', { cache: 'no-store' });
        if (response.ok) {
            const config = await response.json() as RuntimeConfig;
            globalThis.__CRUD_CONFIG__ = Object.freeze(config);
        }
    } catch {
        // Static builds can rely on BUN_PUBLIC_API_URL embedded at build time.
    }
};

await loadRuntimeConfig();
const { default: App } = await import('./App');

const element = document.getElementById('root');
if (!element) {
    throw new Error("L'élément racine de l'application est introuvable.");
}

const application = (
    <StrictMode>
        <App />
    </StrictMode>
);

if (import.meta.hot) {
    const root = (import.meta.hot.data.root ??= createRoot(element));
    root.render(application);
} else {
    createRoot(element).render(application);
}
