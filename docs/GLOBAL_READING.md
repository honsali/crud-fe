# CRUD RH Frontend Architecture

Updated: 2026-09-05. Earlier validation records are explicitly historical below.

Read [`DECISIONS.md`](DECISIONS.md) for the intentions, reasons and corrections to earlier reviews, and [`../README.md`](../README.md) for the application's purpose. Setup and current API contracts live in [`../DEVELOPMENT.md`](../DEVELOPMENT.md); [`../update_plan.md`](../update_plan.md) tracks remaining work. The former workspace `Context.md` and `WORKSPACE.md` are absent from this checkout. The versioned project documents now provide the handoff context.

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

These frontend layers organize presentation, navigation, interaction state, and API transport. They do not own business rules or authoritative validation. Ant Design form checks provide inline feedback only; the co-delivered backend validates requests and its `ApiError` responses remain canonical.

Generated page contracts deliberately separate the complete action request from the values supplied by a component. Strict service inputs such as route identifiers, command payloads and filter criteria are required in `Req*`; shared pagination such as `pageCourante` may remain optional. `FormInstance` belongs only to views and hooks: hooks extract the values, validate command forms, merge URL parameters and dispatch data without adding controller `throw` validation. Filter hooks keep the existing read-without-validation behavior. Hooks deliberately accept `Partial<Req*>`. Each `Res*` property remains optional because an action populates only its own subset; the former `T | {}` result pattern is no longer generated.

Generated controller implementations use Waxant's `ActionOperation<Req, Res>` contract. Form props and table rows are typed, genuinely unused operation parameters use the `_` convention, Redux handlers omit unused callback parameters, constant routes take no unused argument, and empty ACLs import no action catalog. Dated diagnostic counts are recorded in the follow-up plan; they are not guarantees for future edits.

## State and review decisions

Each page model may contain several controller methods with distinct operation states. Hooks adapt React and Redux; `MdlMessage` owns cross-cutting feedback. The named action convention ties execution to UI rights, labels, confirmations and progress. Success/reset/navigation remains the current page convention; a general migration to `unwrap()` has not been selected.

`useExecute` is the earlier approach, not a concurrent architecture used by current pages. Its Waxant export and the `ExecuteResponse` type used by dialog components require an explicit compatibility decision before removal.

Browser tabs run separate JavaScript stores. Internal panels sharing one store are a different scenario. The employee list reducers still lack protection against obsolete responses from overlapping initialization, filtering or pagination requests; that local issue is tracked separately from browser multitab support.

The component named `ErrorBoundary` listens to `window.error`; it is not a React error boundary. Its limited behavior is intentional after loops reported by the owner. The prior instruction to replace it automatically is withdrawn. Revisit its coverage only for an explicit need, with a targeted reproduction and a no-loop check. See [`DECISIONS.md`](DECISIONS.md) for the rationale and evidence limits.

## Authentication and authorization display

`PageAuth` posts credentials to `/api/login`, reads `accessToken`, and passes it to `ContexteAuth`. The context decodes the JWT `sub`, scalar `role`, and `exp` claims. It accepts only roles declared in `mapRole`.

Only the token is stored in `sessionStorage`. Axios adds the bearer header. Expiry or a backend `401` clears the session; no refresh endpoint or user-info endpoint is assumed.

The role-selected domain graph is:

- `ROLE_GESTIONNAIRE_RH` → the HR home, department, employee, and leave modules;
- `ROLE_ADMIN` → account administration only.

`mapDroitAcces` assigns generated HR actions only to the HR manager. These ACLs hide controls but never replace backend authorization.

## Backend API alignment

| Area | Backend endpoints consumed |
|---|---|
| Authentication | `POST /api/login` |
| Accounts | `/api/admin/accounts/**` |
| Departments | `/api/rh/departements/**` |
| Employees | `/api/rh/employes/**`, including `POST /api/rh/employes/filtrer` |
| Leave | `/api/rh/conges/{id}` and `/api/rh/employes/{idEmploye}/conges` |
| References | Department collection plus locally defined immutable choices aligned with Liquibase; no generic reference API |

Employee filtering consumes the backend `PageResponse` fields. API identifiers are serialized by the backend as JSON strings and stay as `string` values in frontend domain models and URL parameters; no numeric ID coercion is performed. UI dates use `DD/MM/YYYY`; JSON dates use ISO `yyyy-MM-dd`.

Current backend errors use `ApiError` with `code`, `message`, `path` and `fieldErrors`. `ErrorSerializationMiddleware` normalizes these responses and also retains support for older message shapes; that compatibility does not change the current backend contract. The frontend presents authoritative failures instead of reimplementing backend business validation.

## Generated service convention

Runtime and generated RH services intentionally use normal TypeScript imports rather than `import type`. The Axios response generic owns the HTTP payload type, `const { data }` keeps the response readable and debuggable, and TypeScript infers the async function return type. The code therefore avoids both redundant `Promise<T>` annotations and inline `(await axios...).data` returns. This convention is covered in the engine by `FeServicePrinterTest`.

String IDs flow through these services unchanged. Paginated filtering maps backend `Page<IEmploye>` data into `{ liste, pagination }`; generated Redux pagination access remains null-safe because the shared pagination interface permits absent state before loading.

## Administrator module

`src/modules/admin/account` provides direct account management for the backend's singular-role policy:

- list accounts;
- create an initially active account;
- change another account's role or activation;
- reset passwords;
- log out locally after resetting the current administrator's password.

The UI provides feedback for the current account. Backend validation and version checks remain authoritative; UI visibility alone is not a guarantee against direct API calls. Local logout does not imply server-side token revocation: the current backend keeps already-issued JWTs valid until expiry, as documented in its [development guide](../../crud-be/DEVELOPMENT.md).

## Generator relationship

Generated-pattern corrections belong in Engine first, followed by generation, comparison and selective transfer. The 2026-09-02 change aligned parent-child routes and made leave code an explicit form value validated by the backend; `ServiceConge` no longer derives it. The 2026-09-05 change completed the remaining form-to-hook migration. The shared HR module trees were identical to generated output after that migration.

Account retains hand-maintained adaptations of its generated structure: distinct command payloads, role and activation mapping, version, password reset and current-account feedback. Host-owned authentication, deployment configuration and error handling also remain in the runnable application. Never overwrite the backend's Account security implementation with its generated candidate.

The generated result is a baseline, not a requirement that customized applications stay identical to it. Preserve `G0`, compare `P` with `G1`, and select the changes appropriate to the application.

## Verification status

The latest implementation lot on 2026-09-05 recorded 13 engine tests, successful generation, 11 frontend form-boundary tests, a successful typecheck and build, exact HR module comparison and unchanged generated backend output. No browser or full-stack E2E was run in that lot. This documentation pass did not rerun those application checks; consult [`../update_plan.md`](../update_plan.md) for their scope.

### Historical validation records

The following results describe earlier API and source versions. They do not establish current browser behavior, reference endpoints or remaining generator differences.

On 2026-07-21:

- `bun run typecheck` passed;
- `bun run build` passed;
- real-browser login passed for both showcase roles against the running backend;
- HR employee pagination and `/rh/reference` loading passed;
- backend `@JsonId` string identifiers passed through reference selection and employee filtering without numeric coercion;
- administrator account listing and role-specific routing passed;
- no account records were mutated during browser verification;
- full-stack E2E remains unavailable because `crud-e2e` is still a scaffold.

Local validation on 2026-07-24:

- the engine's `mvn test` passed all 7 focused tests, including the generated page-contract and text-normalization regression tests;
- the engine was regenerated and intended request/result/hook/pagination/signature changes were transferred selectively;
- opt-in `noImplicitAny`, `noUnusedLocals`, and `noUnusedParameters` checks report zero diagnostics in the 90 generated frontend files;
- runtime and generated frontend overlays now differ semantically only for the known parent-child leave routes and temporary `ServiceConge` behavior;
- `bun run typecheck` passed with zero errors;
- `bun run build` passed.
