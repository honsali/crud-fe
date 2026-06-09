# Agent Notes

## Project overview
- This is a private Bun + React + TypeScript application (`package.json` name: `bun-react-template`).
- The current app branding is SINCORPO: `src/app.tsx` sets `appName: 'SINCORPO'` and `src/index.html` uses `<title>SINCORPO</title>`.
- Runtime entrypoint is `src/index.ts`, which starts a Bun server on port `9000` and serves `src/index.html` for unmatched routes.
- Frontend source is mounted from `src/frontend.tsx` through `src/index.html`.

## Commands
- Development: `bun run dev` (`bun --watch src/index.ts`).
- Production build: `bun run build` (Bun builds `src/index.html` into `dist`).
- Production start: `bun run start` (`NODE_ENV=production bun src/index.ts`).

## Architecture notes
- TypeScript uses `baseUrl: "src"`, so imports commonly resolve from the `src/` root (for example `commun/...`, `modules/...`, `waxant`).
- The application is wrapped by `WaxantApp` from `src/waxant` and renders `LayoutGlobal`.
- Invite-domain modules are registered in `src/domaines/invite/modules.tsx`; the current invite module list includes `ModuleCommun`, `ModuleNavigation`, and `ModuleModule`.
- Access rights are configured in `src/commun/securite/mapDroitAcces.ts` using ACL definitions under `src/commun/securite/acl/`.
