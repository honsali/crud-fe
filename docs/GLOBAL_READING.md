# Global Reading - CRUD RH Frontend

Generated: 2026-06-08

## Snapshot

- Package name: `bun-react-template`
- App title/name: `CRUD`
- Runtime: Bun server + browser React app
- Frontend stack: React 19, TypeScript, Ant Design, Redux Toolkit, React Router, Axios, styled-components
- Local framework: `src/waxant`
- Source file count: about 315 TS/TSX files, with most code in `src/waxant`, `src/modules`, and `src/modele`

## High-level purpose

This is a French-language CRUD application for RH (human resources). The main business entities are:

- `Departement`
- `Employe`
- `Conge`
- Reference entities: `Sexe`, `SituationFamiliale`, `TypeConge`, generic `Reference`

## Entry points

| File | Role |
| --- | --- |
| `src/index.ts` | Bun server on port `9000`, serves `src/index.html`, provides sample `/api/hello` routes. |
| `src/index.html` | HTML shell with `#root` and `frontend.tsx` module script. |
| `src/frontend.tsx` | Creates React root and renders `App` with HMR support. |
| `src/app.tsx` | Builds `WaxantApp` config and renders `LayoutGlobal`. |

## App configuration

`src/app.tsx` passes this to `WaxantApp`:

- `appName`: `CRUD`
- `langue`: `fr`
- `formatDate`: `DD/MM/YYYY`
- `formatDateTime`: `DD/MM/YYYY HH:mm`
- `apiTimeout`: `50000`
- `theme`: `src/commun/theme/theme.ts`
- `mapDroitAcces`: `src/commun/securite/mapDroitAcces.ts`
- `mapRole`: `src/commun/securite/mapRole.ts`
- `mapDomaine`: `src/domaines/mapDomaine.ts`
- `listerReference`: `ServiceReference.lister`

## Waxant framework

`src/waxant` contains a local reusable framework:

- `composants/`: buttons/actions, dialogs, forms, consultation state, tables, widgets, containers, menu.
- `noyau/auth/`: JWT/session-based authentication and login page.
- `noyau/axios/`: Axios timeout/auth header/401 refresh handling.
- `noyau/contexte/`: app, page/view/table/tab/accordion contexts.
- `noyau/i18n/`: label/error/success mapping and hooks.
- `noyau/message/`: action success/error/loading state.
- `noyau/redux/`: dynamic store, async action wrapper, typed hooks, status/error middlewares.
- `noyau/routes/`: module/page definitions, route generation, navigation helpers.
- `noyau/theme/`: Ant Design + styled-components theme providers.
- `noyau/validation/` and `noyau/util/`: validation and utility helpers.

`src/waxant/index.ts` is the public barrel imported as `waxant`.

## Authentication and domains

`PageAuth` posts credentials to `API_URL + '/authenticate'`, then fetches `API_URL + '/user'`. `ContexteAuth` stores `auth_token`, `auth_user`, and `auth_role` in `sessionStorage`.

Backend authorities are mapped as:

```ts
ROLE_USER  -> invite
ROLE_ADMIN -> admin
```

Current `mapDomaine` only defines the `invite` domain. The `invite` domain loads:

1. Home module
2. Commun module
3. RH module with Departement and Employe submodules

## Layout

`src/commun/layout/LayoutGlobal.tsx` provides the main authenticated layout:

- Ant Design layout with sidebar, header, content, footer.
- `LayoutContext` stores sidebar/GED flags in `localStorage`.
- i18n maps are loaded into `MdlI18n` at layout mount.
- Success messages are displayed through Ant Design notifications.
- `DialogueErreur` handles errors.

## Business modules

### Departement

Location: `src/modules/rh/departement`

Routes:

- `/rh/departement/lister`
- `/rh/departement/creer`
- `/rh/departement/consulter/:idDepartement`
- `/rh/departement/modifier/:idDepartement`

Service: `src/modele/rh/departement/ServiceDepartement.ts`

- `POST /departement`
- `GET /departement`
- `GET /departement/{id}`
- `PUT /departement/{id}`
- `DELETE /departement/{id}`

### Employe

Location: `src/modules/rh/employe`

Routes:

- `/rh/employe/filtrer`
- `/rh/employe/creer`
- `/rh/employe/consulter/:idEmploye`
- `/rh/employe/modifier/:idEmploye`

Service: `src/modele/rh/employe/ServiceEmploye.ts`

- `POST /employe`
- `POST /employe/filtrer?page=&size=`
- `GET /employe/{id}`
- `PUT /employe/{id}`
- `DELETE /employe/{id}`

The filter page uses a paginated backend response mapped by `MapperPagination`.

### Conge

Location: `src/modules/rh/employe/conge`

Routes:

- `/rh/employe/:idEmploye/conge/consulter/:idConge`
- `/rh/employe/:idEmploye/creer`
- `/rh/employe/:idEmploye/modifier/:idConge`

Service: `src/modele/rh/conge/ServiceConge.ts`

- `POST /employe/{idEmploye}/conge`
- `GET /conge/employe/{idEmploye}`
- `GET /conge/{idConge}`
- `PUT /conge/{idConge}`
- `DELETE /conge/{idConge}`

The employee ID remains in the route while navigating through a leave workflow. `ServiceConge` currently synthesizes the required leave code from employee, leave type, and start date before create/update; the source marks this as temporary.

## Data and form conventions

- Domain interfaces are optional-field TypeScript interfaces (`id?`, business-specific fields, nested reference objects).
- `Sexe`, `SituationFamiliale`, and `TypeConge` references currently expose IDs and `libelle`, without a `code` field.
- Those reference entities have no dedicated frontend service; selectors use the common `ServiceReference` endpoint.
- Forms use Ant Design `Form` through Waxant's `Formulaire` wrapper.
- `ChampDate` maintains a string field plus a hidden/suffixed Dayjs field for the picker.
- `ChampReference` loads options through `listerReference`, stores the selected object field and a `_libelle` field.
- Tables use `Tableau` and `Colonne`; `tc="reference"`, `tc="date"`, etc. control rendering.

## i18n

Global i18n maps live under `src/commun/i18n` and module-specific maps under each module (`I18nDepartement`, `I18nEmploye`, etc.). Labels and action messages are keyed by page keys, use-case keys, action constants, and helpers such as `titreConfirmation`, `enteteConfirmation`, and `messageSuccess`.

## Security/ACL

Action constants are collected by ACL files:

- `src/commun/securite/acl/aclDepartement.ts`
- `src/commun/securite/acl/aclEmploye.ts`
- `src/commun/securite/acl/aclCommun.ts`
- `src/commun/securite/acl/aclRh.ts`

Buttons of type `ActionUc*` call `useHasRight(actionName)` and are hidden when the current role lacks the action.

## Validation performed during reading

### `bun run build`

Passes after removing the obsolete invite test page.

### `bunx tsc --noEmit --pretty false`

Failed with many TypeScript errors. Main categories:

- Missing export/import mismatch (`ExecuteResponse`).
- Filename casing mismatch (`src/app.tsx` imported as `./App`).
- Strict null/undefined issues around route params, auth role, reducer state, message mapping, and utility return types.
- Duplicate import identifier in `DialogueConfirmation.tsx`.
- Route parameter and pagination typing issues in RH modules.
- JSX namespace typing issue in `PageDefinition.tsx`.

## Watch list for future work

1. Normalize `App` filename/import casing.
2. Replace the temporary client-generated leave code when its final ownership/rule is decided.
3. Decide whether admin should have its own domain/routes and ACLs.
4. Add a `typecheck` script to `package.json` when TypeScript errors are ready to be enforced.
5. Consider making `API_URL` environment-based instead of hardcoded to localhost.
