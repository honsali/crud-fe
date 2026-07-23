import { serve } from 'bun';
import index from './index.html';

const DEFAULT_API_URL = 'http://localhost:8080/api';
const DEFAULT_PORT = 9000;

const configuredPort = Number.parseInt(Bun.env.FRONTEND_PORT ?? String(DEFAULT_PORT), 10);
if (!Number.isInteger(configuredPort) || configuredPort < 1 || configuredPort > 65_535) {
    throw new Error('FRONTEND_PORT must be an integer between 1 and 65535.');
}

const apiUrl = (Bun.env.BUN_PUBLIC_API_URL?.trim() || DEFAULT_API_URL).replace(/\/+$/, '');

const server = serve({
    port: configuredPort,
    routes: {
        '/app-config.json': {
            GET: () => Response.json({ apiUrl }, {
                headers: {
                    'Cache-Control': 'no-store',
                },
            }),
        },
        '/*': index,
    },
    development: process.env.NODE_ENV !== 'production' && {
        hmr: true,
        console: true,
    },
});

console.log(`Frontend running at ${server.url} with API ${apiUrl}`);
