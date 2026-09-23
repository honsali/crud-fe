# Décisions et contexte de reprise

Passation du 2026-09-05 pour `engine`, `crud-fe` et `crud-be`.

Ce document conserve les intentions, les raisons des arbitrages et les rectifications apportées aux anciennes reviews. Il complète les README ; le [plan de suivi](../update_plan.md) porte les travaux encore ouverts et le [guide de développement](../DEVELOPMENT.md) les commandes et contrats actuels.

Les décisions du propriétaire, les constats de code et les hypothèses sont distingués ci-dessous. Une décision peut être réexaminée sur un besoin ou une preuve nouvelle : ce texte ne doit ni empêcher une critique fondée, ni transformer une préférence de reviewer en refonte obligatoire.

Références de code au moment de la passation : `engine` à `3cc1c32`, `crud-fe` à `34eb267`, `crud-be` à `a07843c`. Les observations datées sont à revalider si le code a évolué.

## Intentions communes aux trois projets

1. **Engine est fait pour être modifié.** Son ambition est de faciliter la génération d'applications CRUD-like dans différentes technologies et architectures. La cible implémentée reste Spring et React/Waxant ; adapter le moteur fait partie de son usage, ce n'est pas une promesse de support universel par configuration.
2. **Ses mécanismes centraux sont la hiérarchie des composants et les contributions transversales des Actions.** Une Action sélectionne ses Injections, qui alimentent les Flows ; les printers assemblent les fichiers. Une règle propre à une Action appartient à cette chaîne, pas à une liste de cas CRUD dans un printer générique.
3. **Le frontend et le backend constituent une application co-conçue.** Le backend connaît les besoins des parcours qui le consomment ; il n'est pas pensé comme une API indépendante de son interface. Il reste néanmoins l'autorité pour le métier, les validations, les autorisations, les transactions et l'intégrité, même si l'appel contourne le frontend.
4. **Chaque cible associe un core réutilisable et du code applicatif généré puis personnalisé.** À t = 0, on reprend le gros œuvre compatible avec le core. Ensuite, le développeur choisit dans un outil de diff les évolutions à intégrer. Engine écrit seulement dans `result` ; il ne réécrit pas automatiquement les applications.
5. **La génération donne une forme et un plan de référence, pas seulement un gain de saisie.** Les emplacements et parcours deviennent reconnaissables. Conserver `G0`, comparer l'application `P` et le nouveau résultat `G1` permet aussi de comprendre les personnalisations. La répétition économisée à l'écriture garde toutefois un coût de lecture et de maintenance à évaluer.
6. **Les arbitrages dépendent de la cible.** `crud-be` privilégie démo, bootstrap et POC ; les exigences d'une plateforme bancaire ne sont pas son contrat de V0. `crud-fe` assume une architecture plus élaborée et un TypeScript pragmatique. Ni la simplicité du backend ni la souplesse des types ne dispensent de corriger un défaut fonctionnel réel.

Les [intentions d'Engine](../../engine/README.md) et le [positionnement backend](../../crud-be/README.md) détaillent ce cadre. Le setup reste dans les `DEVELOPMENT.md`, secondaire dans la présentation des projets.

## Arbitrages Engine — mise à jour du 2026-09-07

Le propriétaire lit le projet de haut en bas depuis `App.java`. Un seul `modules.ProjectBootstrap` assemble explicitement `AdminModule` et `RhModule`, sans recherche automatique du bootstrap. Un module métier ne compose pas le projet entier. Les méthodes de chargement et de composition sans état d'instance peuvent être statiques.

Le propriétaire lance manuellement Engine pour une génération à la fois. Il a explicitement choisi le retour au singleton `Context` : la fluidité du code prime ici sur la capacité non demandée de faire coexister plusieurs générations dans une même JVM. Le passage explicite du contexte n'est pas une correction obligatoire ni une règle à réintroduire au nom de la testabilité.

`App` appelle désormais `Context.init()`, puis le moteur accède au contexte par `Context.getInstance()`, sans le transmettre aux modules, actions et printers. L'initialisation repart d'un état neuf, y compris pour les registres, les libellés et le compteur d'actions. Les objets de l'ancienne génération ne sont pas réutilisés. Le bootstrap explicite, les `PageRef` immuables, l'ordre de génération et les contrats de formulaires restent conservés.

Le propriétaire a choisi de regrouper les chemins dans `EnginePaths`, à côté d'`App`, plutôt que dans `Context` ou `LoaderUtils`. `sourceRoot`, `modelPath` et `outputRoot` sont accessibles statiquement : ils décrivent la configuration du moteur, distincte du modèle de génération. `Context.init()` ne prend plus de chemin et ne réinitialise pas cette configuration. Les printers lisent directement `outputRoot` ; les tests qui le remplacent par un dossier temporaire restaurent ensuite sa valeur. `LoaderUtils` conserve seulement ses opérations sur les fichiers et les noms de classes. Compilation, 15 tests et génération réussis pour cette séparation ; les 193 fichiers fraîchement générés sont identiques avant/après.

Des tests successifs dans une même JVM peuvent partager un état global même sans parallélisme : ce risque n'était pas seulement une question de vitesse des tests. La solution retenue est désormais d'adapter les tests au cycle de vie d'Engine : initialisation du singleton par scénario et exécution séquentielle. Le test de coexistence de deux contextes est remplacé par un test de réinitialisation complète. Lors du retour au singleton, la compilation, 15 tests et la génération ont réussi ; les 193 fichiers fraîchement générés étaient identiques avant/après ce refactoring. Voir le [cycle de génération](../../engine/DEVELOPMENT.md#cycle-de-génération).

Le propriétaire a ensuite demandé de supprimer le mécanisme de nommage SQL legacy, et non de le transformer en un autre singleton. `DbNameMapper`, ses correspondances et ses points d'accès sont supprimés. Engine conserve les conventions de nommage ; les exceptions liées au schéma de l'application sont modifiées manuellement dans `crud-be`. Ainsi, `Role` génère une table `role`, tandis qu'une adaptation comme `app_role` reste propre au backend exécutable. Ne pas réintroduire cette correspondance dans le moteur pour faire disparaître une différence intentionnelle avec la cible.

Validation de ce retrait : compilation, 15 tests et génération réussis. Sur les 193 fichiers fraîchement générés, seuls `Role.java` et `role_table.xml` changent pour le passage de `app_role` à `role` ; les 191 autres sont identiques. Aucun code applicatif n'a été transféré vers `crud-be` ou `crud-fe`.

## Architecture frontend à préserver

L'organisation retenue associe modules, pages et cas d'usage, composants visuels, hooks d'adaptation React/Redux, contrôleurs d'orchestration, modèles d'état de présentation et services HTTP. Un même modèle de page peut porter plusieurs méthodes et leurs états distincts. Le nom « MVC » est un repère, pas l'obligation de reproduire un MVC classique.

L'identité d'action constitue une convention commune à l'exécution, aux droits d'affichage, aux libellés, aux confirmations et aux retours utilisateur. Un module apporte ses pages, traductions et reducers ; le domaine du rôle sélectionne leur assemblage. Voir [la lecture du frontend](GLOBAL_READING.md), [ModuleDepartement](../src/modules/rh/departement/ModuleDepartement.tsx) et [ActionUcConfirmer](../src/waxant/composants/actionUc/ActionUcConfirmer.tsx).

La discussion n'a retenu ni remplacement de Redux, ni réécriture de cette organisation. La modularité des fichiers ne prouve pas à elle seule la facilité d'évolution ; il faut observer les modifications réelles et leur coût.

## Arbitrages frontend

### Formulaires : migration réalisée

`FormInstance` appartient aux vues et aux hooks, jamais aux contrats `Req*` des `Mdl*` ni aux `Ctrl*`. Les hooks extraient les valeurs avant dispatch : validation pour les commandes, lecture sans nouvelle validation pour le filtre existant. Les contrôleurs reçoivent des données `request` ou `filtre` et n'ont pas à simuler un formulaire pour être testés.

Les six opérations restantes ont été migrées : modifications de département, employé, congé et compte, filtrage des employés et réinitialisation du mot de passe. Engine porte la règle pour les mises à jour, filtres, recherches et actions spécifiques avec formulaire. Account conserve ses payloads dédiés et ses champs d'affichage ne partent pas à l'API. Les créations avaient déjà été migrées.

Le [lot du 2026-09-05](../update_plan.md) rapporte 13 tests engine, 11 tests frontend, la génération, le typecheck et le build réussis. Les modules RH ont été comparés à la sortie générée ; le backend généré n'a pas changé. Les [tests de frontière](../tests/form-boundary.test.ts) ne constituent pas une validation navigateur ou E2E.

### useExecute : mécanisme historique

Le propriétaire a confirmé que [useExecute](../src/waxant/noyau/redux/useExecute.ts) est l'ancienne manière de faire. La recherche d'usages du 2026-09-05 ne trouve aucun appel du hook dans les pages. Il ne faut donc pas le présenter comme une troisième architecture actuellement concurrente des modèles de page et de `MdlMessage`.

Le hook reste exporté par Waxant et son type `ExecuteResponse` est utilisé par deux composants de dialogue. Un éventuel retrait nécessite de traiter ces usages et la compatibilité du core réutilisable. Aucun retrait ni retour des pages vers ce mécanisme n'a été demandé ou réalisé.

### Succès, état et navigation

Le parcours actuel `succès → reset → navigation` reste une convention valable dans ce projet. Le modèle de page porte les données et les statuts propres aux opérations ; `MdlMessage` porte les retours transversaux. Ces responsabilités ne sont pas des doublons du seul fait qu'elles observent la même action.

Attendre le résultat du thunk avec `unwrap()` est une alternative pour une conséquence locale immédiate, pas une correction obligatoire ni une migration décidée. Évaluer un éventuel problème de consommation répétée ou de cycle de vie sur un scénario concret avant de changer la convention.

### TypeScript, contrats et résultat mutable

Les hooks acceptent volontairement `Partial<Req*>` parce que les paramètres de route complètent la requête. Les entrées strictes des services restent requises dans les contrats ; les résultats de page sont agrégés et leurs propriétés optionnelles, chaque action n'en remplissant qu'une partie. Ne pas multiplier les DTO, les gardes `throw` frontend ou les helpers génériques par principe.

Cette souplesse ne garantit pas tous les appels : `any` et les assertions peuvent contourner des vérifications. Renforcer une frontière lorsqu'un risque concret le justifie reste compatible avec l'intention du projet.

Les imports de contrats depuis le modèle, utilisés seulement comme types par le contrôleur, sont effacés avec la configuration TypeScript retenue. Le graphe source ne suffit donc pas à conclure à une dépendance circulaire à l'exécution. Extraire un fichier de contrats est une option, pas une réparation imposée par ce seul constat.

Le résultat mutable de `ActionOperation<Req, Res>` permet aux contributions générées d'alimenter un même résultat. Un retour immuable pourrait mieux garantir certains champs, mais changer ce contrat toucherait aussi la composition dans Engine. Aucune refonte n'a été décidée.

### Onglets et portée des états

Les onglets du navigateur exécutent des instances JavaScript et des stores distincts. La critique d'un store partagé entre ces onglets a été retirée. Elle ne doit pas réapparaître comme un défaut constaté du projet.

Plusieurs panneaux ou onglets internes à une même instance constituent un autre scénario. Pour deux usages distincts, des méthodes de contrôleur et des états distincts peuvent suffire. Ne pas imposer un registre générique d'instances sans besoin réel. Si plusieurs opérations écrivent malgré tout la même donnée dans un store, vérifier cette portée précise : l'isolation entre onglets du navigateur ne règle pas l'ordre de ces réponses.

### ErrorBoundary : limitation intentionnelle

[ErrorBoundary](../src/waxant/noyau/routes/ErrorBoundary.tsx) est actuellement un composant qui écoute `window.error`, pas une véritable boundary React. Sa couverture ne doit pas être présentée comme équivalente.

Le propriétaire l'a volontairement limitée après des bugs qui provoquaient des boucles infinies. Cette raison est rapportée par le propriétaire ; le scénario et sa cause n'ont pas été reproduits pendant cette session. Le choix courant est de conserver ce comportement limité, pas de remplacer automatiquement le composant au nom d'une ancienne review.

Réouvrir ce sujet demande un besoin explicite de couverture d'erreurs et une reproduction ciblée permettant de vérifier l'absence de boucle. La limitation est documentée ; elle n'est ni une garantie complète de récupération, ni à elle seule une condamnation de l'architecture.

## Constats et questions encore ouverts

### Ordre des réponses asynchrones

Constat de lecture au 2026-09-05 : [MdlFiltrerEmploye](../src/modules/rh/employe/filtrer/MdlFiltrerEmploye.ts) accepte les résultats d'initialisation, de filtrage et de pagination dans la même liste sans vérifier quel appel est encore pertinent. Si des appels se chevauchent, une réponse ancienne peut remplacer une réponse plus récente. Aucun scénario navigateur de ce défaut n'a été exécuté dans cette passation.

C'est un point de comportement local, distinct du multitab navigateur, et non une raison démontrée de réécrire l'architecture. Les thunks issus de `createAsyncThunk` disposent déjà de `meta.requestId` : ajouter un nouveau « call id » n'est pas le préalable nécessaire. Il faut surtout définir la portée de la donnée, mémoriser l'appel pertinent et filtrer les réponses obsolètes. Les `rid` de suivi UI ne réalisent pas actuellement cette protection dans les reducers concernés.

Avant correction, écrire un test de réponses inversées et considérer toutes les actions qui écrivent la donnée, y compris les échecs tardifs. Cette correction reste à faire ; la migration des formulaires ne l'a pas réalisée.

### Autres limites à vérifier

La sémantique « champ absent / chaîne vide / null » après `removeNonSerialisable`, les effets React, le clavier et le chargement des références restent des sujets ciblés du [plan de suivi](../update_plan.md). Une observation d'une ancienne review doit être revalidée avant d'être annoncée comme un défaut actuel.

La tenue sur des parcours plus complexes, le coût des conventions, l'évolution du core entre applications et l'autonomie de plusieurs développeurs restent à éprouver. L'absence de cette démonstration ne prouve ni l'incapacité du socle, ni son aptitude garantie à toute échelle.

## Comment évaluer et poursuivre

- Répondre franchement, à partir du code et des besoins : ni flatterie, ni sévérité artificielle.
- Distinguer décision intentionnelle, défaut constaté, risque conditionnel, préférence de style et capacité non démontrée.
- Distinguer l'évaluation de la V0/bootstrap de celle d'une mise en production donnée. Les risques fonctionnels pertinents restent à traiter dans les deux cas.
- L'appréciation de cette session est celle d'une synthèse cohérente de principes connus, particulièrement intéressante dans son articulation avec Engine. Ce n'est ni une certification d'originalité absolue, ni une preuve de reconnaissance ou d'industrialisation dans de grandes entreprises.
- Pour aller plus loin, examiner un parcours complexe, une évolution transversale dans des modules personnalisés et une reprise par un autre développeur. Ne pas ajouter des couches uniquement pour donner une apparence de sophistication.
- À la reprise, lire les README, les `AGENTS.md`, ce document et le plan actuel ; inspecter le statut Git et le code avant de choisir un lot. Une ancienne review n'autorise pas à appliquer toute sa liste de recommandations.
- Pour les patterns répétés, intervenir dans Engine puis comparer et transférer sélectivement. Préserver les adaptations Account ; ne jamais recopier son backend généré sur l'implémentation de sécurité.
- Mettre à jour ce document lorsqu'un arbitrage change, avec sa raison et les preuves disponibles. Ne pas dépendre d'un ancien fil de discussion ou de chemins temporaires pour transmettre le contexte.
