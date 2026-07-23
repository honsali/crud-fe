# CRUD RH Frontend Architecture

Updated: 2026-07-23

See [`../README.md`](../README.md) for setup, runtime configuration, security contracts, and validation commands.

## Architecture

```text
src/App.tsx
├── commun       application shell, configuration, role maps, ACLs, and labels
├── domaines     authenticated role → module hierarchy
├── modele       API types and explicit services
├── modules      pages, controllers, Redux slices, hooks, forms, and tables
└── waxant       reusable local UI/application framework
```

A CRUD operation normally follows:

```text
View → action component → use* hook → Ctrl* thunk → Service* request → Mdl* reducer
```

This structure is intentionally explicit and generator-friendly. `src/waxant` and host security infrastructure are maintained in the runnable frontend; repetitive HR model/module output is compared with `engine/result/fe` before transfer.

## Authentication and authorization display

`PageAuth` posts credentials to `/api/login`, reads `accessToken`, and passes it to `ContexteAuth`. The context decodes the JWT `sub`, scalar `role`, and `exp` claims. It accepts only roles declared in `mapRole`.

Only the token is stored in `sessionStorage`. Axios adds the bearer header. Expiry or a backend `401` clears the session; no refresh endpoint or user-info endpoint is assumed.

The role-selected domain graph is:

- `ROLE_GESTIONNAIRE_RH` → the HR home, department, employee, and leave modules;
- `ROLE_ADMIN` → account administration only.

`mapDroitAcces` assigns generated HR actions only to the HR manager. These ACLs hide controls but never replace backend authorization.

## Backend API alignment

| Area | Frontend routes |
|---|---|
| Authentication | `POST /api/login` |
| Accounts | `/api/admin/accounts/**` |
| Departments | `/api/rh/departement/**` |
| Employees | `/api/rh/employe/**` |
| Leave | `/api/rh/conge/**` and `/api/rh/employe/{id}/conge` |
| References | `/api/rh/reference/**` |

Employee filtering consumes the backend `PageResponse` fields. API identifiers are serialized by the backend as JSON strings and stay as `string` values in frontend domain models and URL parameters; no numeric ID coercion is performed. UI dates use `DD/MM/YYYY`, matching the backend's `dd/MM/yyyy` JSON representation.

Backend Problem Details are normalized by `ErrorSerializationMiddleware`, including `detail` and validation `fields`.

## Generated service convention

Runtime and generated RH services intentionally use normal TypeScript imports rather than `import type`. The Axios response generic owns the HTTP payload type, `const { data }` keeps the response readable and debuggable, and TypeScript infers the async function return type. The code therefore avoids both redundant `Promise<T>` annotations and inline `(await axios...).data` returns. This convention is covered in the engine by `FeServicePrinterTest`.

String IDs flow through these services unchanged. Paginated filtering maps backend `Page<IEmploye>` data into `{ liste, pagination }`; generated Redux pagination access remains null-safe because the shared pagination interface permits absent state before loading.

## Administrator module

`src/modules/admin/account` provides direct account management for the backend's singular-role policy:

- list accounts;
- create an initially active account;
- change another account's role or activation;
- reset passwords;
- log out immediately after resetting the current administrator's password because the backend revokes that token.

The UI prevents editing the current administrator's role/activation. Backend locking and policy checks remain authoritative.

## Generator relationship

The runnable frontend remains close to `engine/result/fe`. Known deliberate runtime differences include:

- corrected parent-child leave routes and required route parameters;
- temporary leave-code generation in `ServiceConge`;
- host-owned authentication, account administration, deployment configuration, and error handling.

Generated-pattern corrections should be implemented in the engine, regenerated, reviewed, and then transferred selectively. The JSON-string ID contract, typed/destructured Axios service style, and null-safe pagination access are now synchronized with the engine; parent-child route derivation and final leave-code ownership remain deliberate follow-up work.

## Verification status

On 2026-07-21:

- `bun run typecheck` passed;
- `bun run build` passed;
- real-browser login passed for both showcase roles against the running backend;
- HR employee pagination and `/rh/reference` loading passed;
- backend `@JsonId` string identifiers passed through reference selection and employee filtering without numeric coercion;
- administrator account listing and role-specific routing passed;
- no account records were mutated during browser verification;
- full-stack E2E remains unavailable because `crud-e2e` is still a scaffold.

Latest local validation on 2026-07-23:

- `bun install --frozen-lockfile` passed without changing dependencies;
- `bun run build` passed;
- `bun run typecheck` reported 15 errors involving optional route identifiers passed to strict service methods and optional employee pagination used without complete narrowing.
