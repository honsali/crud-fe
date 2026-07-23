# CRUD RH Frontend

Runnable React frontend for the HR showcase. It consumes the sibling `../crud-be` API and uses candidate overlays generated under `../engine/result/fe`.

Shared workspace decisions are documented in [`../Context.md`](../Context.md) and [`../WORKSPACE.md`](../WORKSPACE.md).

## Responsibilities

This project owns:

- the browser application and Waxant UI foundation;
- authentication state and bearer-token handling;
- role-selected domains, routes, menus, reducers, and ACL display rules;
- the HR screens and API services;
- the administrator account-management screens.

Frontend ACLs only control presentation. The backend remains the security boundary.

## Requirements

- Bun
- the backend running on its configured address

Install dependencies with:

```bash
bun install
```

The committed `bun.lock` keeps dependency resolution deterministic.

## API configuration

`BUN_PUBLIC_API_URL` configures the API root at server startup or build time. It defaults locally to:

```text
http://localhost:8080/api
```

Override it when building or serving elsewhere, for example:

```bash
BUN_PUBLIC_API_URL=https://client.example/api bun run build
```

The value must include the `/api` prefix. Trailing slashes are removed automatically. The Bun server exposes the resolved non-secret value through `/app-config.json`, allowing the same frontend bundle to use external deployment configuration.

`FRONTEND_PORT` changes the Bun server port and defaults to `9000`.

## Running and validation

```bash
bun run dev
bun run typecheck
bun run build
```

The development server listens on port `9000`. `dist/` is disposable build output and is not committed.

## Security contract

Authentication uses `POST /api/login` with `username` and `password`. The backend returns `{ "accessToken": "..." }`.

The frontend derives display identity from the JWT `sub` and scalar `role` claims. It stores only the bearer token in `sessionStorage`, attaches it to Axios requests, logs out when it expires, and logs out after an authenticated request receives `401`. There is no refresh-token flow and no `/api/user` endpoint.

Supported roles are deliberately separate:

| Backend role | Frontend domain |
|---|---|
| `ROLE_GESTIONNAIRE_RH` | HR departments, employees, leave, and reference data |
| `ROLE_ADMIN` | Account list, creation, role/activation update, and password reset |

An administrator cannot access HR routes, and an HR manager cannot access account-administration routes. The backend enforces the same separation.

## API namespaces

- Login: `/api/login`
- Account administration: `/api/admin/accounts/**`
- HR CRUD: `/api/rh/**`
- HR reference data: `/api/rh/reference/**`

All API identifiers are JSON strings and remain `string` throughout frontend models, services, URL parameters, form values, and strict comparisons. The backend preserves `Long` internally and applies `@JsonId` only at the JSON boundary.

Dates use `DD/MM/YYYY` in the UI and `dd/MM/yyyy` JSON values. Employee pagination consumes the backend-owned `PageResponse` shape.

## TypeScript and service conventions

In generated and runtime API services, use normal imports rather than `import type`; the project deliberately keeps `verbatimModuleSyntax: false`, so TypeScript/Bun removes type-only usage during compilation. Axios services follow one readable shape:

```ts
import { IDepartement } from './DomaineDepartement';

const creer = async (departement: IDepartement) => {
    const { data } = await axios.post<IDepartement>(
        `${API_URL}/rh/departement`,
        departement,
    );
    return data;
};
```

Put the response type on the Axios call, destructure `data`, and let TypeScript infer the async function return type. Do not duplicate the same type with `Promise<IDepartement>` and do not return `(await axios...).data` inline. Delete operations simply await Axios without returning response data. Services that transform pagination return a plain inferred object, and consumers use optional access where the shared pagination model permits an absent value.

These repeated service conventions belong in `../engine` first. Regenerate, review `engine/result/fe`, and transfer only the intended changes while preserving runtime customizations.

## Project structure

```text
src/
├── commun/      application configuration, layout, labels, roles, and ACL maps
├── domaines/    role-to-module graphs for administrator and HR domains
├── modele/      API models and services
├── modules/     account and HR pages/workflows
└── waxant/      reusable UI, routing, Redux, authentication, and error infrastructure
```

Most files under `src/modele/rh` and `src/modules/rh` are generator-shaped. Repeated changes to those files normally belong in the engine first, followed by generation, comparison, and selective transfer. Host-owned authentication and account administration remain explicit runtime frontend code.

## Current limitations

- As of 2026-07-23, `bun run build` passes but `bun run typecheck` reports 15 errors where optional route identifiers reach strict service calls and optional employee pagination is consumed without complete narrowing.
- Leave-code ownership is still temporary in `ServiceConge` and must be decided with the backend contract.
- The engine still needs to absorb deliberate runtime differences such as parent-child leave routes and stronger route parameter types.
- Full-stack E2E orchestration is not yet available because `../crud-e2e` remains a scaffold.
