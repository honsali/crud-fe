# Développer et exécuter le frontend

Le [README](README.md) présente l'intention du frontend, son core réutilisable et le workflow d'intégration des écrans générés. Ce guide rassemble les commandes, la configuration et les contrats de la cible actuelle.

## Prérequis et démarrage

Prérequis : Bun et le [backend](../crud-be/DEVELOPMENT.md) accessible à l'adresse configurée.

Depuis la racine du frontend :

```bash
bun install --frozen-lockfile
bun run dev
```

Le fichier `bun.lock` versionné fixe la résolution des dépendances. Le serveur de développement écoute par défaut sur le port `9000`.

## Configuration de l'API

`BUN_PUBLIC_API_URL` définit la racine de l'API au démarrage du serveur ou à la construction du bundle. La valeur locale par défaut est :

```text
http://localhost:8080/api
```

La valeur doit inclure le préfixe `/api`. Les barres obliques finales sont retirées automatiquement.

Exemples pour un shell POSIX :

```bash
BUN_PUBLIC_API_URL=https://client.example/api bun run dev
BUN_PUBLIC_API_URL=https://client.example/api bun run build
```

Le serveur Bun expose la valeur résolue, non secrète, dans `/app-config.json`. Le frontend privilégie cette configuration à l'exécution, puis la valeur définie lors du build, puis la valeur locale par défaut.

`FRONTEND_PORT` configure le port du serveur Bun et vaut `9000` par défaut. Les valeurs exposées au navigateur doivent rester non secrètes.

## Construction et vérifications

```bash
bun run typecheck
bun test tests/form-boundary.test.ts
bun run build
```

`dist/` est une sortie de build jetable, non versionnée, à retirer après vérification. Le script `bun run start` lance actuellement le serveur Bun depuis `src/index.ts` avec `NODE_ENV=production` ; il ne sert pas automatiquement le dossier `dist/`.

Les tests de frontière formulaire exécutent les hooks, contrôleurs et reducers réels avec des contextes React et des services HTTP simulés. Ils vérifient les valeurs envoyées à Redux et aux services ; ils ne remplacent pas un test navigateur.

Le modèle de déploiement et les commandes adaptées aux autres shells sont suivis dans [update_plan.md](update_plan.md). Une vérification navigateur est distincte du typecheck et du build ; l'orchestration E2E complète reste à construire dans `crud-e2e`.

## Contrat d'authentification

L'authentification utilise `POST /api/login` avec `username` et `password`. Le backend retourne `accessToken`, `tokenType` et `expiresIn`. La durée dépend du TTL backend, fixé localement à une heure par défaut.

Le frontend déduit l'identité affichée des claims JWT `sub` et `role`, ce dernier étant une chaîne unique. Il conserve uniquement le bearer token dans `sessionStorage`, l'ajoute aux requêtes Axios, puis déconnecte l'utilisateur à son expiration ou après un `401` reçu sur une requête authentifiée.

Il n'existe pas de renouvellement par refresh token ni de point d'entrée `/api/user`.

Les rôles sélectionnent des domaines frontend distincts :

| Rôle | Domaine présenté |
|---|---|
| `ROLE_GESTIONNAIRE_RH` | Départements, employés, congés et référentiels RH |
| `ROLE_ADMIN` | Liste, création, consultation, modification et réinitialisation du mot de passe des comptes |

Les routes et ACL frontend contrôlent la présentation. La configuration backend actuelle réserve `/api/admin/**` aux administrateurs et exige une authentification pour les autres routes `/api/**`, dont les routes RH. La sélection des modules dans l'interface ne remplace pas ces autorisations.

## Contrats API

- Connexion : `/api/login`.
- Administration des comptes : `/api/admin/accounts/**`.
- CRUD RH : `/api/rh/**`.
- Choix des départements : `GET /api/rh/departements`.

Tous les identifiants API sont des chaînes JSON et restent `string` dans les modèles, services, paramètres d'URL, valeurs de formulaire et comparaisons frontend. Le backend conserve des `Long` et applique `@JsonId` à la frontière JSON.

Les dates utilisent `DD/MM/YYYY` dans l'interface et des valeurs JSON ISO `yyyy-MM-dd`.

La pagination des employés consomme le contrat backend `PageResponse` : `items`, `page`, `size`, `totalElements`, `totalPages`, `first` et `last`. Le frontend adapte ce contrat à son modèle de pagination partagé.

Les erreurs canoniques du backend utilisent `ApiError`, avec `code`, `message`, `path` et `fieldErrors`. L'interface présente le message et les erreurs de champs sans reproduire les décisions métier du serveur.

Le backend actuel n'expose pas de points d'entrée génériques pour les référentiels. Les départements proviennent de leur collection API ; les listes immuables de sexes, situations familiales et types de congé reprennent les identifiants des données Liquibase. Elles doivent évoluer avec ces données.

## Conventions TypeScript et services

Le [tsconfig.json](tsconfig.json) active `strict`, mais désactive notamment `noImplicitAny`, `noUnusedLocals` et `noUnusedParameters`. `verbatimModuleSyntax` vaut `false`, ce qui permet à TypeScript/Bun d'effacer les usages limités aux types.

Les services API générés et exécutables utilisent des imports ordinaires. Le type de réponse est porté par l'appel Axios, `data` est déstructuré puis retourné, et le type de retour asynchrone est inféré :

```ts
import axios from 'axios';
import { API_URL } from 'commun';
import { IDepartement } from './DomaineDepartement';

const creer = async (departement: IDepartement) => {
    const { data } = await axios.post<IDepartement>(
        `${API_URL}/rh/departements`,
        departement,
    );
    return data;
};
```

Les suppressions attendent simplement l'appel Axios. Les services qui transforment la pagination retournent un objet dont le type est inféré ; les consommateurs tiennent compte des valeurs optionnelles du modèle partagé.

Les conventions répétées de ces services appartiennent d'abord à Engine. Régénérer, examiner `engine/result/fe`, puis transférer les changements utiles en conservant les personnalisations du runtime.

## Contrats des pages générées

Une page peut partager des interfaces `Req*` et `Res*` entre plusieurs actions. Les identifiants, corps de commande `request` et critères `filtre` nécessaires à un service strict restent requis ; les valeurs partagées de pagination, comme `pageCourante`, peuvent être optionnelles. Les hooks de ces actions acceptent la partie utile de la requête, puis la complètent avec les paramètres de route.

Les hooks valident les formulaires de commande et préparent une `request` sérialisable avant de la transmettre à l'action Redux. Pour un filtrage, ils lisent les valeurs dans `filtre` sans ajouter une validation absente du parcours initial. L'instance de formulaire reste dans les vues et les hooks : ni les contrats `Req*` des `Mdl*`, ni les `Ctrl*` ne dépendent d'Ant Design. Le backend conserve l'autorité de validation de ces données.

Les adaptations Account construisent dans les hooks les requêtes explicites de création, de modification et de réinitialisation du mot de passe. Les champs d'affichage du formulaire ne sont pas envoyés à l'API.

Les résultats agrégés utilisent des propriétés optionnelles, chaque action ne renseignant que son sous-ensemble. Les consommateurs gèrent ces valeurs sans union `T | {}`.

Waxant expose `ActionOperation<Req, Res>` pour typer les implémentations de contrôleur. Les formulaires et lignes de tableau sont typés, les paramètres d'opération réellement inutilisés portent un préfixe `_`, les callbacks Redux gardent les paramètres nécessaires et les routes constantes utilisent un `toPath` sans argument.

Le renforcement des garde-fous et les diagnostics encore présents sont suivis dans [update_plan.md](update_plan.md). Ces constats doivent être vérifiés sur l'arbre courant avant modification.

## Organisation et intégration

```text
src/
├── commun/      configuration, layout, libellés, rôles et ACL
├── domaines/    composition des modules selon le rôle
├── modele/      contrats et services API
├── modules/     pages et parcours des comptes et du domaine RH
└── waxant/      composants et infrastructure UI réutilisables
```

Les fichiers de `src/modele/rh` et `src/modules/rh` suivent la forme du générateur. Les changements répétés se préparent dans Engine, puis sont régénérés, comparés et transférés sélectivement selon le [workflow du README](README.md).

L'administration des comptes part également d'une structure générée. Les fichiers de `src/modele/admin/account` et `src/modules/admin/account` conservent leurs adaptations : API plurielle sécurisée, requêtes distinctes de création/modification/réinitialisation, identifiants canoniques, présentation des rôles, retour après modification de son propre compte, réinitialisation du mot de passe, redirection initiale et absence de suppression.

Le backend Account généré ne doit pas écraser l'implémentation de sécurité de `crud-be`.

Les fichiers texte versionnés utilisent LF et un saut de ligne final, conformément à `.gitattributes` et `.editorconfig`, afin de préserver la lisibilité des comparaisons.

## Limites suivies

- Les trois référentiels immuables sans API doivent rester alignés sur les identifiants Liquibase.
- L'acceptation E2E complète dépend de l'implémentation de l'orchestration `crud-e2e`.
- Le typage, les hooks, l'intégrité des formulaires et plusieurs comportements Waxant font l'objet du [plan de suivi](update_plan.md).
