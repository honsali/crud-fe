# CRUD RH Frontend Architecture

Updated: 2026-07-24

See [`../README.md`](../README.md) for setup, runtime configuration, security contracts, and validation commands, and [`../update_plan.md`](../update_plan.md) for the active review follow-up sequence. Shared frontend/backend ownership is defined authoritatively in [`../../Context.md`](../../Context.md), with operational consequences in [`../../WORKSPACE.md`](../../WORKSPACE.md); this document only describes how the frontend implements that boundary.

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

These frontend layers organize presentation, navigation, interaction state, and API transport. They do not own business rules or authoritative validation. Ant Design form checks provide inline feedback only; the co-delivered backend validates every request and its Problem Details remain canonical.

Generated page contracts deliberately separate the complete action request from the values supplied by a component. Strict service inputs such as route identifiers are required in `Req*`; `form` and `pageCourante` remain optional because several actions share one page contract. Hooks accept `Partial<Req*>`, merge URL parameters, and dispatch without adding controller `throw` validation. Each `Res*` property remains optional because an action populates only its own subset; the former `T | {}` result pattern is no longer generated.

Generated controller implementations use Waxant's `ActionOperation<Req, Res>` contract. Form props and table rows are typed, genuinely unused operation parameters use the `_` convention, Redux handlers omit unused callback parameters, constant routes take no unused argument, and empty ACLs import no action catalog. The generated overlay therefore contributes no `noImplicitAny`, `noUnusedLocals`, or `noUnusedParameters` diagnostic.

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

Backend Problem Details are normalized by `ErrorSerializationMiddleware`, including `detail` and validation `fields`. The frontend presents these authoritative failures instead of reimplementing backend business validation.

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

- corrected parent-child leave routes and their runtime parameter names;
- client-side leave-code derivation in `ServiceConge`, a known boundary violation to remove; either the backend derives the code or the user supplies it according to the business requirement;
- host-owned authentication, account administration, deployment configuration, and error handling.

Generated-pattern corrections should be implemented in the engine, regenerated, reviewed, and then transferred selectively. The JSON-string ID contract, typed/destructured Axios service style, and null-safe pagination access are now synchronized with the engine. Parent-child route derivation remains engine follow-up work; leave-code semantics remain a backend/business decision, but the frontend must not derive the code.

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

Latest local validation on 2026-07-24:

- the engine's `mvn test` passed all 7 focused tests, including the generated page-contract and text-normalization regression tests;
- the engine was regenerated and intended request/result/hook/pagination/signature changes were transferred selectively;
- opt-in `noImplicitAny`, `noUnusedLocals`, and `noUnusedParameters` checks report zero diagnostics in the 90 generated frontend files;
- runtime and generated frontend overlays now differ semantically only for the known parent-child leave routes and temporary `ServiceConge` behavior;
- `bun run typecheck` passed with zero errors;
- `bun run build` passed.
