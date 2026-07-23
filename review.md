# Deep discovery summary

> Historical snapshot: the original review below predates the July 2026 backend-alignment work and is retained as discovery evidence, not current guidance. See [`README.md`](README.md) and [`docs/GLOBAL_READING.md`](docs/GLOBAL_READING.md) for current behavior.

## Resolution status — 2026-07-22

| Historical finding | Current status |
|---|---|
| Duplicate router runtimes and authenticated-route crash | Resolved; dependency resolution is locked and browser routing passes |
| TypeScript reported 67 errors and was not enforced | Partially resolved; the script is enforced, but the 2026-07-23 current tree reports 15 route-identifier and pagination nullability errors |
| Roles, domains, ACLs, and backend authorization disagreed | Resolved; singular `ROLE_GESTIONNAIRE_RH` and `ROLE_ADMIN` contexts are intentionally separate |
| Login expected `/authenticate`, `/user`, and refresh support | Resolved; `/api/login`, JWT claims, token-only session state, expiry, and `401` logout match the backend |
| API URL, frontend port, sample routes, and lockfile were unsuitable for deployment | Resolved through external runtime configuration, `/app-config.json`, `FRONTEND_PORT`, and tracked `bun.lock` intent |
| Frontend string IDs disagreed with backend numeric JSON | Resolved at the boundary: backend `Long` IDs use `@JsonId`, JSON/frontend IDs are strings, and no per-service mapper is required |
| Admin domain rendered an empty shell | Resolved with account listing, creation, role/activation update, and password reset |
| Generated service typing/style could drift from runtime | Resolved for current CRUD services: Axios generics, `const { data }`, inferred returns, normal imports, and an engine regression test |
| Parent-child leave routes and client-generated leave code | Still open generator/business-contract follow-up work |
| Accessibility improvements and executable full-stack E2E | Still open; `crud-e2e` remains a scaffold |

No account records were mutated during browser verification. The original measurements and recommendations below describe the earlier baseline only.

The application has a sound central idea and should **not be rewritten**. Its strongest design is the role-selected module graph that drives navigation, routes, reducers, translations, and generated CRUD workflows.

However, the current working tree is **not ready for further feature development or client delivery**. Stabilization should come first.

## 1. Actual architecture

Your three-way description is correct, with two additional orchestration areas:

```text
src/app.tsx
├── src/commun       application shell, security maps, theme, global labels
├── src/domaines     role → module hierarchy
├── src/modele       domain types and API services
├── src/modules      navigation, pages and CRUD workflows
└── src/waxant       reusable application framework
```

### Responsibilities

- `src/modele` — entities, references, pagination contracts and Axios services.
- `src/modules` — pages, controllers, Redux slices, hooks, forms, tables and actions.
- `src/waxant` — authentication, routing, dynamic Redux store, i18n, errors, forms, tables, dialogs, ACL-aware actions and theming.
- `src/domaines` — selects the module graph for each normalized role.
- `src/commun` — client/application-specific infrastructure around Waxant.

The dependency direction is mostly good:

```text
domaines → modules → modele
                   → waxant
commun ────────────→ waxant
```

One boundary leak exists: `waxant/noyau/auth/PageAuth.tsx` imports the app-owned `API_URL` from `commun`.

## 2. Runtime and CRUD lifecycle

The provider structure is:

```text
AuthProvider
└── AppRoutes
    └── DynamicStoreProvider
        └── ErrorBoundary
            └── App/theme/i18n contexts
                └── LayoutGlobal
```

A typical CRUD operation follows:

```text
View
→ use-case action component
→ use* hook
→ Ctrl* async thunk
→ Service* Axios request
→ Mdl* Redux slice
→ selector
→ navigation/notification/error dialog
```

This is verbose for a hand-written application, but reasonable when reliably generated. It gives every use case a predictable location and clear behavior.

## 3. Generator relationship

The frontend is very strongly generator-shaped:

- `src/waxant`: approximately **7,955 lines**
- `src/modules`: approximately **2,644 lines**
- `src/modele`: approximately **365 lines**

I compared `engine/result/fe` with the runnable frontend. Ignoring line endings and final newlines:

- **85 of 90 generated files are identical**
- only five runtime files deliberately differ

The differences concern:

- corrected employee/leave parent-child routes;
- required employee/leave route parameters;
- temporary client-side leave-code generation.

Therefore, repeated fixes in `modele` or `modules` normally belong in the engine first. Currently, regenerating the candidate would reintroduce the old leave-route behavior.

## 4. What is already good

- Central and discoverable configuration in `src/app.tsx`.
- Routes, menus, reducers and module translations derive from one hierarchy.
- API services remain simple and explicit.
- CRUD workflows are consistent.
- Loading, errors and success feedback are centralized.
- Employee filtering uses server pagination.
- Generic reference loading works across departments, sex, marital status and leave type.
- Frontend endpoints, `dd/MM/yyyy` dates and pagination shape mostly agree with the backend.
- Waxant does not depend directly on HR entities.
- The architecture remains appropriate for isolated, small-business applications.

## 5. Immediate blockers

### P0 — Authenticated routing currently crashes

The working-tree dependency update has:

- `react-router@7.18.1`
- `react-router-dom@7.17.0`
- a nested `react-router@7.17.0`

The code mixes imports from `react-router` and `react-router-dom`. I reproduced this fatal browser error after entering an authenticated frontend state:

```text
[Route6] is not a <Route> component
```

Recommended correction:

1. use browser routing APIs consistently from `react-router-dom`;
2. remove the unnecessary direct `react-router` dependency if possible;
3. track the Bun lockfile so duplicate router runtimes cannot silently return.

### P0 — TypeScript is not a functioning safeguard

The production bundle succeeds, but type checking currently reports:

- **67 errors**
- across **34 files**
- **54 errors inside Waxant**

Examples include:

- `App`/`app.tsx` filename casing;
- missing `ExecuteResponse`;
- duplicate `BoutonTexteFort` import;
- unsafe route parameters;
- nullability errors;
- Redux middleware typing;
- invalid JSX namespace usage.

The build does not run TypeScript validation, so a successful bundle is not proof of correctness.

### P0 — Roles, domains and ACLs contradict each other

Current configuration:

```text
ROLE_USER  → invite
ROLE_ADMIN → admin
```

But:

- `mapDomaine` defines only `invite`;
- `invite` receives all implemented CRUD actions, including delete;
- `admin` receives an empty action list;
- role selection takes the first recognized authority;
- the backend showcase account has both `ROLE_USER` and `ROLE_ADMIN`.

A frontend-only admin-state smoke check rendered an empty shell. This needs a deliberate product decision, not just a technical patch.

The backend currently allows all `/api/**` endpoints to either role. Therefore, frontend ACLs only control presentation; they are not security enforcement.

## 6. Other high-priority findings

### Deployment configuration

- API URL is hardcoded to `http://localhost:8080/api`.
- Frontend port `9000` is hardcoded.
- `build` creates `dist`, but `start` runs `src/index.ts`.
- The Bun server still contains sample `/api/hello` routes.
- `bun.lock` exists but is ignored and untracked.

The simplest production model may be a same-origin `/api` behind a reverse proxy. Otherwise, API location and port should be externally configured.

### Authentication and 401 handling

The refresh-token machinery is incomplete:

- no backend refresh endpoint is used;
- `setRefreshTokenCallback` is never registered;
- `auth:logout` is dispatched but never handled;
- Axios interceptors are never ejected;
- React `StrictMode` can register duplicate interceptors during development.

For this small application, predictable logout on expiry or `401` is simpler than unfinished refresh infrastructure.

### Engine drift

The engine still generates the old leave routes through generic `.pathById()` behavior. It needs explicit parent-child route support and a regression test before regeneration.

### API typing

Frontend/backend contracts mostly agree operationally, but compile-time contracts are weak:

- frontend IDs are `string`; backend IDs are `Long`;
- almost every frontend property is optional;
- create, update, filter and response types reuse the same interfaces;
- reference objects are submitted whole;
- `ServiceConge` mutates the request to manufacture a required code.

Separate generated create/update/response/filter types would improve safety without adding runtime machinery.

### Leave workflow

- `commentaire` exists and is shown in the list, but is absent from create, edit and detail screens.
- Leave code is generated temporarily inside `ServiceConge`.
- The generator candidate does not contain that customization.

Ownership of the leave code must be decided: user-entered business identifier or backend-owned derivation.

### Accessibility

Several basic controls are not keyboard-safe:

- Waxant buttons prevent default handling for Enter and Space.
- Logout is an `Avatar` with an `onClick`, not a semantic button.
- Clickable table rows have no keyboard equivalent.
- Some icon buttons have no accessible name.

These are framework-level corrections with benefits for every generated screen.

## 7. Recommended enhancement sequence

### Stage 1 — Restore a trustworthy baseline

1. Correct router dependency/import consistency.
2. Track a deterministic Bun lockfile.
3. Fix all TypeScript errors.
4. Add enforced `typecheck` and `build` scripts.
5. Normalize the `App` filename casing.
6. Resolve the role/domain/ACL model.
7. Externalize API and server configuration.

### Stage 2 — Stabilize Waxant

1. Simplify 401 handling and clean up Axios interceptors.
2. Replace the current window listener with a real React error boundary placed above routing.
3. Restore native keyboard behavior.
4. Make reference loading handle failures and cancellation.
5. Clarify Waxant’s supported public exports.
6. Remove or repair unused framework features that currently break type checking.
7. Remove Waxant’s dependency on `commun/API_URL`.

### Stage 3 — Correct generated patterns

1. Add engine support for parent-child routes.
2. Generate stronger request/response and route-parameter types.
3. Add focused engine regression tests.
4. Synchronize engine output with the five runtime deviations.
5. Decide and encode leave-code ownership.

### Stage 4 — Business and UX enhancements

Only after stabilization:

- responsive layout, if tablets/phones are required;
- improved filters and sorting;
- client-specific permissions and PII visibility;
- leave comments and business validation;
- branding and client-readiness cleanup;
- full-stack browser acceptance once `crud-e2e` is implemented.

## 8. Validation performed

- Temporary production bundle: **passed**
  - minified JavaScript approximately **2.35 MB**
- TypeScript check: **failed with 67 errors**
- Login page browser rendering: **passed**
- Authenticated invite routing smoke check: **fatal router error reproduced**
- Admin frontend-state smoke check: **empty application shell reproduced**
- Frontend/backend API contracts: statically compared
- Engine candidate/runtime comparison: completed
- Real backend login and CRUD: **not run; backend was unavailable**
- Full-stack E2E: **not available**
- No files were modified.

The repository remains on a divergent branch with the pre-existing `package.json` modification intact.

My recommendation is to begin with the **baseline stabilization stage**, especially routing, type checking, and role semantics, before discussing new functional features.