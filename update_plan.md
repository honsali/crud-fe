# Plan de mise à jour après la review frontend

Date de passation : 2026-07-24

Ce document est le point de reprise pour les prochaines sessions. Il transforme les constats de l'audit local `review24.07.2026.md` et du résumé versionné [`review.md`](review.md) en un plan ordonné compatible avec [`../Context.md`](../Context.md), [`../WORKSPACE.md`](../WORKSPACE.md) et les responsabilités réelles du frontend, du backend et de l'engine.

L'audit reste une source de constats à vérifier, pas une spécification. Chaque point doit être reproduit sur l'arbre courant avant modification. Ne pas introduire automatiquement une couche, une dépendance, plusieurs DTO frontend ou une refonte Waxant uniquement parce que l'audit les suggère.

## État synthétique

| Action | État | Prochaine décision |
|---|---|---|
| 1. Remettre `bun run typecheck` au vert | **Terminée** | Maintenir le typecheck à zéro erreur |
| 2. Renforcer progressivement les garde-fous TypeScript et le formatage | **En cours — format et bruit initial mesurés** | Corriger d'abord les signatures générées, puis traiter Waxant par lots |
| 3. Corriger les routes parent/enfant et la propriété du code congé | À faire | Décider d'abord si le code est saisi ou dérivé par le backend |
| 4. Corriger les risques d'intégrité des formulaires | À vérifier puis faire | Définir explicitement la sémantique « conserver / vider / null » avec le backend |
| 5. Stabiliser les défauts Waxant à fort impact | À faire par petits lots | Error boundary, clavier, logout, chargement des références |
| 6. Nettoyer dépendances et vestiges inutilisés | À vérifier puis faire | Supprimer seulement après preuve d'absence d'usage |
| 7. Clarifier l'idiome admin et le déploiement | À faire | Aligner les conventions sans imposer une refonte générale |
| 8. Ajouter l'acceptation full-stack | Bloquée | `crud-e2e` est encore un scaffold |

## Décisions à préserver

1. Le frontend et le backend sont deux runtimes d'une seule application co-livrée.
2. Le backend reste l'autorité pour les règles métier, la validation, l'autorisation, les transactions et l'intégrité.
3. Le frontend garde les composants, la navigation, l'état d'interaction, l'orchestration HTTP et le feedback inline non autoritaire.
4. Aucun `throw` de validation n'est généré dans les contrôleurs frontend pour les identifiants, formulaires ou filtres.
5. Dans les contrats de page générés :
   - les identifiants consommés par un service strict sont requis dans `Req*` ;
   - `form` et `pageCourante` restent optionnels lorsqu'un même `Req*` sert plusieurs actions ;
   - les hooks acceptent `Partial<Req*>`, puis fusionnent les paramètres de route avant dispatch ;
   - les propriétés de `Res*` sont optionnelles, car chaque action ne renseigne que son sous-ensemble ;
   - le pattern `T | {}` n'est plus généré.
6. Les identifiants API restent `Long`/`BIGINT` côté backend et `string` côté JSON/frontend via `@JsonId`.
7. Toute correction répétée dans `src/modele/rh` ou `src/modules/rh` doit commencer dans `engine`, être régénérée, comparée puis transférée sélectivement.
8. Ne jamais recopier en masse `engine/result` sur les applications exécutables.
9. Ne pas multiplier les DTO frontend par principe ; renforcer les contrats seulement lorsqu'un risque concret le justifie.

## Action 1 terminée — baseline TypeScript

### Engine

Le générateur produit maintenant les contrats suivants :

- distinction explicite entre attributs de requête requis et optionnels ;
- identifiants/champs stricts requis dans `Req*` ;
- hooks en `Partial<Req*>` pour recevoir la partie fournie par le composant avant fusion avec `useParams()` ;
- résultats d'action optionnels sans union `T | {}` ;
- accès null-safe à la liste et à la pagination ;
- pagination listée avec page par défaut `0` lorsque le contrat partagé laisse `pageCourante` optionnel.

Le test ciblé est :

```text
engine/src/test/java/model/test/FePageContractPrinterTest.java
```

Il protège les identifiants requis, les valeurs UI optionnelles, l'absence de `T | {}`, le hook `Partial<Req*>` et les accès paginés null-safe. Il s'agit d'un seul test ajouté ; les six tests annoncés correspondent à toute la suite engine.

### Frontend exécutable

Le transfert sélectif couvre :

- les `Mdl*` RH concernés ;
- les hooks RH générés ;
- `src/modules/rh/employe/filtrer/element/TableauEmploye.tsx` ;
- `src/waxant/composants/tableau/Tableau.tsx`.

Aucun contrôleur frontend ne contient les anciens blocs :

```ts
if (requete.id... === undefined || requete.id... === null) {
    throw new Error(...);
}
```

Le backend conserve donc toute l'autorité de validation. `Partial<Req*>` ne valide rien : il décrit seulement la partie de requête fournie au hook avant ajout des paramètres URL.

### Validation obtenue

Exécuté avec succès le 2026-07-24 :

```text
cd engine && mvn test                         6 tests passés
cd engine && mvn exec:java -Dexec.mainClass=dev.cruding.engine.App
cd crud-fe && bun run typecheck               0 erreur
cd crud-fe && bun run build                   succès
```

Également vérifié :

- `git diff --check` dans `crud-fe` et `engine` ;
- suppression de `crud-fe/dist/` après le build ;
- comparaison sémantique `engine/result/fe/src` ↔ `crud-fe/src`.

Les deux seules différences sémantiques connues restent :

```text
src/modele/rh/conge/ServiceConge.ts
src/modules/rh/employe/ListePageEmploye.tsx
```

Elles correspondent respectivement à la dérivation temporaire du code congé et aux routes parent/enfant corrigées seulement dans le runtime.

Non validé dans ce lot : navigateur réel, backend exécuté, base PostgreSQL et E2E full-stack.

## Action 2 — garde-fous TypeScript et formatage

Objectif : rendre les futurs défauts visibles sans lancer une refonte générale.

1. **Terminé le 2026-07-24 :** reproduire séparément les diagnostics avec `noImplicitAny`, les règles de hooks et les vérifications de code inutilisé.
2. **Terminé le 2026-07-24 :** classer les erreurs entre Waxant, code généré, runtime spécifique et déclarations de bibliothèques.
3. Corriger les patterns générés dans l'engine avant les occurrences RH répétées.
4. Choisir un outillage minimal : éviter d'ajouter plusieurs linters/formatters concurrents.
5. **Terminé le 2026-07-24 :** imposer LF et un unique saut final afin de supprimer le bruit du comparateur.
6. Activer une règle seulement lorsqu'elle est verte sur l'arbre courant et possède une commande documentée.
7. Ne pas mélanger ce lot avec un nettoyage fonctionnel de Waxant.

### Lot 2.1 terminé — fins de ligne et de fichier

- `crud-fe/.gitattributes` impose LF aux fichiers texte suivis, indépendamment de `core.autocrlf`.
- `crud-fe/.editorconfig` demande LF et un saut final aux éditeurs compatibles.
- Tous les fichiers texte suivis de `crud-fe` ont été normalisés sans changement fonctionnel.
- L'engine porte la même configuration et son `Printer` normalise toujours les contenus générés en LF avec exactement un saut final, même si le fichier précédent était en CRLF.
- `engine/src/test/java/dev/cruding/engine/printer/PrinterTest.java` protège ce comportement.
- Après régénération, 88 des 90 fichiers frontend partagés sont identiques octet pour octet. Les deux seules différences restent les personnalisations déjà connues de `ServiceConge.ts` et `ListePageEmploye.tsx` ; il n'existe plus de faux positif de fin de ligne ou de fichier.

Validation du lot : 7 tests engine passés, génération réussie, `bun run typecheck` et `bun run build` réussis. Aucun navigateur, backend ou E2E full-stack n'a été exécuté pour ce changement purement textuel.

### Lot 2.2 terminé — mesure séparée du bruit initial

Le typecheck normal reste vert avec zéro diagnostic. Les règles désactivées ont ensuite été mesurées sans modifier `tsconfig.json`, `package.json` ou le lockfile :

- `noImplicitAny` : 323 diagnostics dans 87 fichiers ; 294 dans Waxant et 29 dans 20 fichiers générés, aucun dans le runtime spécifique ni dans `node_modules`. Les 29 occurrences générées se répartissent en 20 paramètres `thunkAPI`, 6 props `form` déstructurées et 3 paramètres de ligne de tableau. Waxant concentre notamment 98 accès indexés TS7053 ; un TS7016 signale aussi l'absence de déclaration de `base-64` depuis `ChampFichier.tsx`.
- code inutilisé : 105 diagnostics dans 49 fichiers. `noUnusedLocals` produit 15 diagnostics (12 Waxant, 1 généré, 2 runtime) et `noUnusedParameters` en produit 90 (78 générés, 9 Waxant, 3 runtime). Les occurrences générées sont principalement 46 paramètres `action`, 19 `thunkAPI`, 6 `resultat`, 5 `args`, 2 `requete` et un import `ActionRh`.
- hooks React : aucune violation de `rules-of-hooks`, mais 65 avertissements `exhaustive-deps` dans 47 fichiers : 42 dans Waxant, 21 dans 17 fichiers générés et 2 dans `LayoutGlobal.tsx`.

L'ESLint transitif actuellement installé (`eslint` 8.57.1, parseur TypeScript 5.62.0) plante avec TypeScript 7.0.2 et ne peut donc pas devenir le garde-fou permanent. La mesure des hooks a été recoupée avec le parseur Babel installé puis avec une pile compatible temporaire hors dépôt (`eslint` 10.7.0, parseur TypeScript 8.65.0, plugin hooks 7.1.1) ; les deux ont produit les mêmes 65 avertissements de hooks. Aucune dépendance ou configuration de lint n'a été ajoutée pendant cette mesure.

La prochaine correction doit rester bornée : traiter dans l'engine les signatures générées responsables des `thunkAPI`, `form`, paramètres de tableau et callbacks Redux inutilisés, ajouter un test focalisé, régénérer puis mesurer de nouveau. Les 294 diagnostics `noImplicitAny` et 42 avertissements de hooks propres à Waxant formeront des lots séparés ; ils ne doivent pas être masqués par une activation globale prématurée.

Critères d'acceptation :

- commandes déterministes dans `package.json` ;
- `typecheck`, lint choisi et build verts ;
- hooks React vérifiés mécaniquement ;
- comparaison généré/runtime lisible sans faux positifs massifs ;
- `dist/` absent après validation.

## Action 3 — routes congé et propriété du code

### Décision métier préalable

Choisir une seule règle :

- le code congé est saisi par l'utilisateur ; ou
- le backend le dérive de manière autoritaire.

Le frontend ne doit plus inventer ni muter ce code dans `ServiceConge`.

### Modification technique

1. Ajouter dans l'engine une représentation explicite du paramètre de route parent/enfant au lieu de déduire systématiquement `:id<EntityDePage>`.
2. Couvrir au minimum :
   - création d'un congé sous `idEmploye` ;
   - liste des congés d'un employé ;
   - consultation/modification/suppression sous `idConge`.
3. Générer les hooks et `toPath` avec le bon identifiant.
4. Ajouter un test engine focalisé sur ces routes.
5. Régénérer et supprimer la différence manuelle de `ListePageEmploye.tsx`.
6. Appliquer la décision de code congé dans le backend, le contrat HTTP et le frontend.

Critères d'acceptation :

- aucune collision de route employé/congé ;
- aucun paramètre `idConge` sur la création sous employé ;
- aucune dérivation métier dans `ServiceConge` ;
- tests engine, backend et frontend verts ;
- vérification navigateur des parcours employé → congé.

## Action 4 — intégrité des formulaires

Le constat sur `removeNonSerialisable` doit être reproduit avec le backend avant correction. Le risque est qu'une chaîne vide ou un `null` supprimé du payload empêche l'utilisateur de vider une valeur existante.

1. Documenter la sémantique backend de mise à jour pour chaque champ nullable : absent, `null`, chaîne vide.
2. Vérifier les mappers/services de mise à jour et les contraintes Liquibase.
3. Remplacer le nettoyage global par une règle explicite compatible avec cette sémantique.
4. Ajouter un test seulement pour le risque concret « vider une valeur existante ».
5. Vérifier séparément la présence de `commentaire` dans création, modification, détail et liste du congé ; corriger seulement si le besoin métier confirme ce champ éditable.

## Action 5 — Waxant à fort impact

Traiter dans des commits indépendants :

1. remplacer le listener global actuel par une vraie error boundary React placée au-dessus des routes concernées ;
2. restaurer le comportement clavier natif des boutons ;
3. rendre la déconnexion sémantique, focusable et nommée ;
4. décider si les lignes de tableau sont interactives et fournir alors clavier/rôle/focus cohérents ;
5. gérer erreur, annulation et démontage dans le chargement des références ;
6. corriger les effets de rendu manifestement invalides (`Sablier`, callbacks/effets de `Tableau`) après reproduction.

Chaque lot doit avoir une vérification navigateur ciblée. Ne pas refondre tout Waxant en une seule fois.

## Action 6 — dépendances et code mort

1. Rechercher les usages réels dans le code, les scripts et le lockfile avant toute suppression.
2. Retirer une petite famille à la fois : anciens outils CRA, éditeurs/charts non utilisés, EventBus/RxJS, composants métier étrangers au showcase.
3. Après chaque suppression : installation figée, typecheck, build et smoke test.
4. Ne pas supprimer un composant uniquement parce qu'il n'est pas utilisé par le showcase s'il appartient délibérément à la base réutilisable ; documenter cette décision.
5. Éviter de combiner nettoyage de dépendances et changement fonctionnel.

## Action 7 — idiome admin et déploiement

### Administration

Commencer par le minimum : aligner `ServiceAccount` sur la convention Axios documentée et réutiliser la normalisation d'erreur lorsque cela réduit réellement la duplication. Ne pas forcer automatiquement le module admin dans toute la chaîne Redux générée.

### Déploiement

1. choisir explicitement si Bun sert les sources/runtime ou si `dist/` est servi comme bundle statique ;
2. vérifier le comportement réel de `/app-config.json` dans ce modèle ;
3. documenter une commande Windows et une commande POSIX réellement exécutables ;
4. tester le démarrage avec une API externe configurée ;
5. garder secrets et credentials hors du bundle et du dépôt.

## Action 8 — E2E full-stack

Cette action reste bloquée tant que `crud-e2e` n'est pas implémenté. Le futur scénario minimal doit reconstruire PostgreSQL, démarrer backend/frontend, se connecter avec chaque rôle et vérifier au moins :

- séparation admin/RH ;
- filtrage paginé des employés ;
- création/consultation/modification/suppression avec identifiants JSON string ;
- parcours parent/enfant employé/congé ;
- présentation des Problem Details backend.

Ne pas annoncer de couverture E2E avant exécution réelle de cette orchestration.

## Procédure de reprise d'une prochaine session

1. Lire `../Context.md`, `../WORKSPACE.md`, les `AGENTS.md` applicables et ce fichier.
2. Inspecter séparément `git status` dans `crud-fe`, `engine` et `crud-be`.
3. Lire les commits créés après cette passation ; ne pas supposer que tous les fichiers locaux ont été inclus.
4. Choisir une seule action ci-dessus et reproduire le constat avant modification.
5. Pour un pattern généré : engine d'abord, `mvn test`, génération, comparaison, transfert sélectif.
6. Valider seulement les projets réellement touchés et rapporter précisément ce qui n'a pas été exécuté.

## État des arbres avant commit/push

Les dépôts sont indépendants et le dossier `C:\crudRH\current` n'est pas un dépôt Git.

Éléments préexistants à ne pas inclure automatiquement sans inspection :

- `crud-fe/package.json` ;
- `crud-fe/review24.07.2026.md` non suivi ;
- `engine/pom.xml` ;
- `crud-be/pom.xml` ;
- `crud-be/run.bat`.

Le correctif #1 produit des changements de code dans `engine` et `crud-fe`. `crud-be` ne reçoit que de la documentation dans cette passation. Les documents racine sous `C:\crudRH\current` doivent être conservés ou versionnés par un mécanisme distinct, puisque ce dossier n'est pas un dépôt.

Aucun stage, commit ou push n'a été effectué dans cette session.
