Je vais d'abord explorer la structure du projet et lire les documents `.md` de référence, puis auditer `crud-fe` en profondeur.

Audit terminé. Voici le rapport complet — sévère, comme demandé, mais chaque constat est vérifié dans le code.

---

# Audit critique de `crud-fe` — 2026-07-24

**Validations exécutées** : `bun run typecheck` (échec reproduit : 15 erreurs), `bun run build` (succès, bundle ~15 Mo dont ~2,4 Mo JS), diff complet `engine/result/fe` ↔ runtime, lecture de l'infrastructure Waxant, des modules générés, du module admin et des documents de référence (`Context.md`, `WORKSPACE.md`, `AGENTS.md` racine et local, `README.md`, `docs/GLOBAL_READING.md`, `review.md`). Aucun fichier modifié, sauf suppression de `dist/` après vérification (conforme à [AGENTS.md:13](crud-fe/AGENTS.md)). La modification pré-existante de `package.json` (version 0.2.0 non commitée) a été préservée.

## Verdict global

L'architecture centrale (graphe rôle → domaine → modules → routes/reducers/i18n) reste saine et le contrat backend est réellement respecté. Mais **le projet vit en contradiction avec ses propres documents fondateurs**. `Context.md` §6 érige « un garde-fou est plus fort qu'un avertissement » en principe ; le frontend n'a *aucun* garde-fou mécanique fonctionnel : le typecheck est rouge en permanence, il n'y a ni ESLint, ni formateur, ni CI, et `strict: true` est vidé de sa substance par `noImplicitAny: false`. Presque tous les correctifs « Stage 2 » et « Stage 3 » du plan de stabilisation de `review.md` sont encore ouverts, alors que ce document date d'avant juillet et que les docs affichent le chantier comme largement « resolved ».

---

## 1. Garde-fous désarmés (le plus grave)

**1.1 — Un typecheck rouge en permanence est un typecheck inexistant.** Les 15 erreurs ([CtrlConsulterDepartement.ts:7](crud-fe/src/modules/rh/departement/consulter/CtrlConsulterDepartement.ts), [MdlFiltrerEmploye.ts:52](crud-fe/src/modules/rh/employe/filtrer/MdlFiltrerEmploye.ts), [TableauEmploye.tsx:19](crud-fe/src/modules/rh/employe/filtrer/element/TableauEmploye.tsx)…) sont documentées comme « limitation » depuis le 2026-07-23. Tant qu'elles restent, **toute nouvelle erreur de type est invisible** — le garde-fou existe mais il est désarmé. C'est exactement l'anti-pattern que `Context.md` interdit. La cause racine est un défaut de pattern généré (voir §4), donc la correction appartient au moteur — et c'est précisément pourquoi elle stagne.

**1.2 — `strict: true` est un affichage.** [tsconfig.json:54](crud-fe/tsconfig.json) désactive `noImplicitAny`, `noUnusedLocals` et `noUnusedParameters`. Résultat mesuré : ~98 occurrences de `any` explicite, dont 82 dans Waxant — le socle partagé de tous les futurs clients. `PageDefinition.toPath` est typé `(any?) => string` ([PageDefinition.tsx:8](crud-fe/src/waxant/noyau/routes/PageDefinition.tsx)) : le nom du paramètre est littéralement `any`. C'est la source directe des 15 erreurs de paramètres de route.

**1.3 — Aucun linter, aucun formateur.** Pas de config ESLint, pas de script `lint`, pas de Prettier/EditorConfig. Les `useEffect` à dépendances manquantes ([ViewConsulterDepartement.tsx:18](crud-fe/src/modules/rh/departement/consulter/ViewConsulterDepartement.tsx), [Tableau.tsx](crud-fe/src/waxant/composants/tableau/Tableau.tsx)), les imports morts ([aclRh.ts](crud-fe/src/commun/securite/acl/aclRh.ts) importe `ActionRh` pour exporter un tableau vide) et les variables inutilisées ([DialogueErreur.tsx:85](crud-fe/src/waxant/composants/dialogue/DialogueErreur.tsx) déstructure `logout` sans l'utiliser) passent sans bruit. Pour une base maintenue par un développeur seul et des agents IA — la prémisse même de l'écosystème — l'outillage automatique n'est pas du confort, c'est la mémoire d'équipe qui n'existe pas.

**1.4 — L'`ErrorBoundary` est un faux.** [ErrorBoundary.tsx](crud-fe/src/waxant/noyau/routes/ErrorBoundary.tsx) est un composant fonctionnel qui écoute `window.addEventListener('error')` — ce n'est **pas** une error boundary React. Une erreur de rendu démonte tout l'arbre React : écran blanc, le listener meurt avec. Pire : n'importe quelle erreur `window` globale (y compris une extension navigateur) remplace définitivement l'application par la page d'erreur, sans bouton de retour. C'était l'item 2 du Stage 2 de `review.md` ; il est toujours ouvert et n'apparaît plus dans aucune liste de limitations.

---

## 2. Accessibilité : régression généralisée, jamais corrigée

Tous les constats de `review.md` §6 sont encore exacts :

- [BoutonTexte.tsx:29](crud-fe/src/waxant/composants/bouton/texte/BoutonTexte.tsx) fait `preventDefault()` sur Entrée **et** Espace : **tous les boutons de tous les écrans générés sont inutilisables au clavier**. C'est une décision de framework qui condamne chaque application cliente future.
- [BoutonLogout.tsx](crud-fe/src/commun/layout/element/BoutonLogout.tsx) : la déconnexion est un `Avatar` avec `onClick` — pas un bouton, pas de nom accessible, pas de focus clavier.
- [Tableau.tsx](crud-fe/src/waxant/composants/tableau/Tableau.tsx) : lignes cliquables via `onCell.onClick` sans équivalent clavier ni rôle.
- [BlocAvatar.tsx](crud-fe/src/commun/layout/element/BlocAvatar.tsx) passe un `<FontAwesomeIcon>` dans la prop `src` d'`Avatar` (détournement d'API, prop `icon` prévue pour cela).

---

## 3. La règle d'or du moteur est violée par sa propre vitrine

**3.1 — Régénérer aujourd'hui casse l'application.** Le moteur génère toujours les routes congé erronées : `/rh/employe/consulter/:idConge` entre en collision avec la consultation employé, et `creer/:idConge` n'a pas de sens (diff vérifié sur `ListePageEmploye.tsx`). La correction n'existe qu'à la main dans le runtime. La règle n°1 de l'écosystème — « corriger le pattern dans le moteur d'abord » — est en défaut depuis la revue de juillet sur le défaut générateur le plus dangereux connu.

**3.2 — 87 fichiers de bruit de comparateur.** Sur 90 fichiers générés, 87 diffèrent du moteur **uniquement** par l'absence de saut de ligne final (plus un espace traînant dans `ListePageEmploye.tsx`). Le root [AGENTS.md:64](AGENTS.md) exige explicitement d'éliminer « formatting that would otherwise create comparator noise ». Le workflow sacré « comparer avant de transférer » exige donc de filtrer mentalement 87 faux positifs à chaque itération. C'est un correctif d'une ligne (générateur ou EditorConfig) jamais fait.

**3.3 — `ServiceConge` fabrique un identifiant métier côté client** ([ServiceConge.ts:7](crud-fe/src/modele/rh/conge/ServiceConge.ts)) en **mutant son paramètre d'entrée**. « Temporaire » depuis juillet ; la décision de propriété du code congé (backend ou utilisateur) est un choix de contrat d'une demi-journée qui bloque la resynchronisation moteur depuis des mois.

---

## 4. Typage API : le contrat est opérationnel, jamais compilé

- **Interfaces tout-optionnel réutilisées partout** : `IEmploye` sert d'entité, de payload création, de payload modification **et** de filtre — il contient donc `debutDateNaissance`/`finDateNaissance` (bornes de recherche) au milieu des champs métier ([DomaineEmploye.ts](crud-fe/src/modele/rh/employe/DomaineEmploye.ts)). `IDepartement` porte à la fois `id` et `idDepartement`.
- **Le pattern généré `Res* = X | {}`** ([MdlConsulterDepartement.ts](crud-fe/src/modules/rh/departement/consulter/MdlConsulterDepartement.ts), [MdlFiltrerEmploye.ts:14](crud-fe/src/modules/rh/employe/filtrer/MdlFiltrerEmploye.ts)) est un type-poubelle : `{}` est assignable à toute interface tout-optionnelle, donc rien n'est vérifié — et c'est lui qui produit les erreurs de pagination restantes.
- **Piège d'intégrité de données** : [util.ts:4](crud-fe/src/waxant/noyau/util/util.ts) (`removeNonSerialisable`) supprime les chaînes vides et les nulls du payload de formulaire. **Il est donc impossible de vider un champ existant depuis l'interface** : l'utilisateur efface « commentaire », enregistre, et le champ est simplement absent de la requête. Silencieux et faux.
- Le champ `commentaire` du congé est affiché en liste ([TableauConge.tsx](crud-fe/src/modules/rh/employe/consulter/element/TableauConge.tsx)) mais absent de la création, de la modification **et** du détail ([FormulaireConge.tsx](crud-fe/src/modules/rh/employe/conge/creer/element/FormulaireConge.tsx), [EtatConge.tsx](crud-fe/src/modules/rh/employe/conge/consulter/element/EtatConge.tsx)) : on montre une donnée qu'aucun écran ne permet de saisir. Signalé en juillet ; disparu des limitations du README sans avoir été corrigé.

---

## 5. Deux applications dans une seule

Le module admin ([ViewAccounts.tsx](crud-fe/src/modules/admin/account/ViewAccounts.tsx)) n'utilise **rien** de l'infrastructure que le reste du projet impose : antd brut, `useState`, appels service directs, son propre mappeur d'erreurs (`apiErrorMessage`, doublon de [ErrorSerializationMiddleware.ts](crud-fe/src/waxant/noyau/redux/ErrorSerializationMiddleware.ts)), chaînes en dur hors i18n, aucune ACL, toasts `message.error` alors que le RH affiche un modal `DialogueErreur`. Et [ServiceAccount.ts:7](crud-fe/src/modele/commun/account/ServiceAccount.ts) viole **les deux règles** de la convention Axios que `README.md` et `AGENTS.md` présentent comme testée côté moteur : annotations `Promise<T>` redondantes **et** `return (await axios...).data` inline. La vitrine censée servir de référence aux futurs clients démontre deux idiomes concurrents ; dans six mois, lequel fait foi ?

---

## 6. Waxant : un framework sous-entretenu et sur-dimensionné

~7 300 lignes, 137 exports dans le barrel — pour une application qui en consomme une fraction. Vérifié par recherche d'usages :

- **Composants à zéro usage** : `ChampImmatriculation`, `ChampImmatriculationSimple`, `ChampHeure`, `ChampFichier`, `ChampTel`, `ChampSliderNumerique`, `ChampTexteModifiableParDialogue`, `TimeLine`, `Plaque`, `DialogueOuiNon`, `DialogueInformation`, `ActionUcVerrouiller/Deverrouiller/Valider/Rejeter/Refuser/Accepter`, etc.
- **Vestiges d'un autre projet** : des champs d'immatriculation de véhicules et [DonneeReference.ts](crud-fe/src/modele/commun/reference/DonneeReference.ts) avec `CATEGORIE_TACHE = { JUDICIAIRE, REGLEMENT, REGLEMENT_BLOQUE }` — du contentieux/recouvrement dans une vitrine RH. `Context.md` dit « ce n'est pas un framework généraliste » et la règle n°4 dit « préférer supprimer du code » ; c'est exactement le contraire.
- **Défauts internes réels** : [Tableau.tsx](crud-fe/src/waxant/composants/tableau/Tableau.tsx) — `useCallback([children])` capturant des closures périmées (`i18n`, `indexElementSelectionne`), effets déclenchés sur `.length`, `dayjs.extend` à chaque rendu ; [Sablier.tsx](crud-fe/src/waxant/composants/widget/Sablier.tsx) — `window.scrollTo` **pendant le rendu** et des `<text>` SVG rendus hors de tout `<svg>` (les messages de chargement ne s'affichent pas correctement) ; [DialogueErreur.tsx:90](crud-fe/src/waxant/composants/dialogue/DialogueErreur.tsx) — branche 403 morte (`code?.status` sur une string, masqué par un `any`) ; [ChampReference.tsx:27](crud-fe/src/waxant/composants/formulaire/champ/ChampReference.tsx) — `.then()` sans `.catch`, ni annulation, ni protection anti-setState-après-démontage (item Stage 2 « failures and cancellation » non fait).
- **6 fichiers de Waxant importent depuis le barrel `'waxant'`** (dont [AppRoutes.tsx:4](crud-fe/src/waxant/noyau/routes/AppRoutes.tsx)) : imports circulaires internes, ordre d'initialisation fragile.
- **Flux implicites** : `useExecute` injecte `...params` d'URL + `user`/`role` dans chaque requête ([useExecute.ts:65](crud-fe/src/waxant/noyau/redux/useExecute.ts)) ; l'antithèse du « code explicite » revendiqué. [AsyncStatusMiddleware.ts:12](crud-fe/src/waxant/noyau/redux/AsyncStatusMiddleware.ts) réinitialise les messages globaux à **chaque** action pending : deux requêtes concurrentes s'écrasent mutuellement leurs erreurs.
- [AppRoutes.tsx:18](crud-fe/src/waxant/noyau/routes/AppRoutes.tsx) calcule les routes dans un `useState`+`useEffect` : un cycle de rendu de retard après login (flash possible de `PageNotFound`) là où un `useMemo` suffit.

---

## 7. Dépendances : le `package.json` d'un autre projet

- **Morts et vérifiés inutilisés** : `react-scripts` 5.0.1 + `craco-less` (vestiges Create-React-App — des centaines de Mo d'install et une surface d'audit énorme pour zéro usage), `react-quill` (incompatible React 19 de surcroît), `@ant-design/charts`, `qs`, `print-js`. `rxjs` ne sert qu'à un [EventBus](crud-fe/src/waxant/noyau/rx/EventBus.ts) de 25 lignes **lui-même jamais utilisé hors de Waxant**. `base-64` sert un seul composant (`ChampFichier`) à zéro usage, alors que `atob` natif est déjà utilisé dans `ContexteAuth`.
- **`react-router` + `react-router-dom` tous deux en dépendance avec imports mélangés** ([AppRoutes.tsx](crud-fe/src/waxant/noyau/routes/AppRoutes.tsx) importe `react-router`, [PageDefinition.tsx](crud-fe/src/waxant/noyau/routes/PageDefinition.tsx) importe `react-router-dom`). C'est la configuration exacte qui a produit le crash P0 de juillet. Le lockfile aligne aujourd'hui les versions, mais la recommandation actée (« imports cohérents, supprimer la dépendance directe ») n'a pas été appliquée : le piège est réarmé pour la prochaine montée de version.
- Le paquet s'appelle toujours `bun-react-template`, et le bump `0.1.0 → 0.2.0` traîne non commité dans l'arbre de travail.

**Déploiement incohérent** : `build` produit `dist/`, mais `start` exécute `bun src/index.ts` — **rien ne sert jamais `dist/`**. Le README promet « le même bundle avec configuration externe via `/app-config.json` », or cet endpoint n'existe que dans le serveur Bun de dev ; un déploiement statique de `dist/` n'a pas de `/app-config.json` et retombe silencieusement sur l'URL compilée. De plus `NODE_ENV=production bun ...` est une syntaxe POSIX qui échoue sous PowerShell/cmd — sur une machine de dev Windows. L'histoire de production n'a jamais été exécutée de bout en bout.

---

## 8. Divers (en vrac, vérifié)

- [PrivateRoute.tsx](crud-fe/src/waxant/noyau/routes/PrivateRoute.tsx) : props `requiredRole`/`requiredRoles` jamais utilisées, textes anglais en dur (« Access Denied ») dans une application française, styles inline ; `PageNotAuthorized.tsx` est un fichier mort.
- Placeholders vides accumulés : `mapErreur`, `mapMessage`, `mapTitre`, `mapActionCtrl` quasi vides ; enums `APP_MODULES`/`APP_EVENT` vides ([constants.config.ts:14](crud-fe/src/commun/config/constants.config.ts)) ; [ModuleCommun](crud-fe/src/modules/commun/ModuleCommun.tsx) monte une page `<div></div>` vide sur `/commun` dans chaque domaine RH.
- I18n négligé dans le contenu généré : « Consulter Departement » sans accent, « Êtes-vous sûr de vouloir **Maj** ce Departement ? » — du jargon technique montré à l'utilisateur final ([I18nDepartement.ts](crud-fe/src/modules/rh/departement/I18nDepartement.ts)). C'est généré, donc chaque client héritera de ces libellés.
- Durcissement : l'intercepteur global attache le Bearer à **toute** requête axios sans restriction d'origine ([axios.config.ts:13](crud-fe/src/waxant/noyau/axios/axios.config.ts)) — inoffensif aujourd'hui, fuite de jeton le jour où un appel externe passe par axios. Une instance axios dédiée avec `baseURL` fermerait le risque.

## Ce qui est solide (pour être juste)

[ContexteAuth.tsx](crud-fe/src/waxant/noyau/auth/ContexteAuth.tsx) est le meilleur fichier du projet : décodage base64url correct, validation des claims, timer d'expiration borné à `MAX_TIMEOUT_MS`, session tout-ou-rien. Les intercepteurs sont correctement éjectés. La séparation des rôles est cohérente sur toute la chaîne et conforme au backend. Le module admin, malgré son style divergent, gère bien les cas fins (interdiction de modifier son propre rôle, déconnexion après réinitialisation de son propre mot de passe). La documentation est d'une qualité rare et honnête sur ses limites — c'est d'ailleurs ce qui rend l'écart entre l'intention écrite et le code mesurable.

## Priorités recommandées

1. **Remettre le typecheck à zéro erreur et l'y maintenir** — via la correction du pattern moteur (`Req*` optionnels, `Res* | {}`, `toPath` typé), pas par des rustines runtime.
2. **Réactiver `noImplicitAny` + ajouter ESLint (règles hooks incluses) et un formateur avec saut de ligne final** — cela résout aussi les 87 faux positifs du comparateur.
3. **Corriger dans le moteur les routes congé et décider la propriété du code congé** — tant que ce n'est pas fait, chaque régénération est un champ de mines.
4. **Purger les dépendances mortes et les vestiges d'autres projets** (react-scripts, craco, quill, charts, qs, print-js, rxjs/EventBus, base-64, composants immatriculation, `CATEGORIE_TACHE`).
5. **Vraie error boundary, clavier restauré sur `BoutonTexte`, logout sémantique** — trois correctifs de framework qui bénéficient à tous les écrans générés.
6. **Trancher le double idiome admin/RH** (au minimum : aligner `ServiceAccount` sur la convention documentée) et clarifier l'histoire de déploiement de `dist/`.

Les points 1–3 conditionnent tout le reste : c'est la crédibilité du principe fondateur — « un garde-fou est plus fort qu'un avertissement » — qui se joue là.