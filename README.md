# CRUD RH Frontend

Ce projet est la partie navigateur d'une application RH construite avec [crud-be](../crud-be/README.md). Il permet d'exécuter et d'éprouver le gros œuvre produit par [Engine](../engine/README.md), puis de le compléter au fil des besoins de l'application.

L'intention est de disposer d'un core frontend réutilisable et d'une forme commune pour les écrans : des composants composables, des parcours reconnaissables et une organisation qui reste lisible après personnalisation.

## Une application conçue avec son backend

Le frontend et le backend sont développés et livrés ensemble. Les contrats HTTP se construisent à partir des parcours utilisateur et évoluent avec eux : recherche paginée, références de formulaire, actions et présentation des erreurs.

Le frontend porte les composants, les layouts, la navigation, l'état d'interaction et l'orchestration des appels API. Le backend prend les décisions métier et garantit validation, autorisations, transactions et intégrité.

Les contrôles de formulaire donnent un retour immédiat à l'utilisateur. Les erreurs du backend restent la réponse faisant autorité. Les types TypeScript décrivent les échanges internes de cette application ; ils accompagnent l'interface sans constituer un second modèle métier.

## Un core réutilisable et des modules générés

Le projet distingue les fondations communes, la configuration de l'application et ses parcours :

| Partie | Rôle |
|---|---|
| `src/waxant` | Core UI : composants, routage, état, authentification et présentation des erreurs |
| `src/commun` et `src/domaines` | Configuration, layout, libellés, rôles et composition des modules de l'application |
| `src/modele` et `src/modules` | Contrats HTTP, services, pages et parcours applicatifs, dont la partie issue d'Engine |

Waxant est destiné à être repris dans les applications partageant cette stack et ces conventions. Les modules s'appuient sur ce socle pour fournir une expérience cohérente. La configuration et les adaptations propres au projet restent dans l'application qui l'utilise.

La cible actuelle repose sur React, TypeScript, Bun, Ant Design et Redux. Engine porte la composition des écrans et les contributions des actions aux différentes couches ; il peut être modifié pour produire une autre organisation ou une autre technologie.

## Une architecture élaborée, un typage pragmatique

L'architecture frontend assume une organisation plus élaborée que les couches conventionnelles du backend de démonstration. Une page peut associer une vue, des composants, un hook, un contrôleur et un modèle d'état. Le core coordonne les modules, les routes, les actions et les retours à l'utilisateur.

Cette organisation permet de composer des interfaces et de retrouver les mêmes repères dans plusieurs parcours. La génération prend en charge une grande partie de la répétition nécessaire à cette structure.

La souplesse TypeScript est un choix de travail : les types doivent clarifier les contrats et aider à modifier l'interface, avec une syntaxe et une inférence qui restent légères. Le durcissement systématique du typage n'est pas un objectif en soi. Un contrat est précisé lorsqu'il protège un comportement utile ou rend le code plus compréhensible.

Cette souplesse conserve des points fermes, notamment les identifiants API en chaînes, les entrées attendues par les services et les contrats des actions. Les limites de typage et les défauts identifiés se traitent progressivement ; le [plan de suivi](update_plan.md) les distingue des conventions déjà stabilisées.

## Le gros œuvre donne une forme aux écrans

La démonstration couvre les départements, les employés et leurs congés, ainsi que l'administration des comptes. Ces parcours partagent une organisation que l'on retrouve d'un module à l'autre.

Le bénéfice est aussi dans la lecture du projet : savoir où chercher l'état d'une page, son appel HTTP ou ses composants réduit l'effort pour comprendre un écran nouveau. Cette forme commune reste utile lorsque les comportements propres à l'application se multiplient.

Le résultat généré constitue le plan de base de cette organisation. Le comparer à l'application permet de voir les lignes et les blocs ajoutés ou transformés depuis, comme les travaux réalisés dans une maison par rapport au plan d'origine.

## À t = 0, reprendre ; ensuite, sélectionner

Une fois le core et les conventions de la cible préparés, les fichiers d'un nouveau module peuvent être repris tels quels depuis `engine/result/fe`. Le développeur fait ensuite évoluer les écrans dans ce dépôt.

Une nouvelle génération produit une proposition que le développeur examine avec son outil de diff. Il reprend les fichiers, blocs ou lignes qui l'intéressent, en conservant les adaptations du frontend exécutable. Engine écrit uniquement dans `result` ; le transfert dans l'application reste explicite.

Pour comprendre les différences, on conserve l'ancien résultat généré `G0`. On le compare à l'application actuelle `P` et au nouveau résultat `G1` : une partie restée identique peut être remplacée, une partie personnalisée reçoit les changements sélectionnés.

Les corrections répétées dans les écrans générables commencent dans Engine, puis sont régénérées, comparées et transférées. Les interactions propres à cette application restent dans ses modules. Le [workflow Engine](../engine/README.md) explique ce partage.

L'administration des comptes illustre cette démarche : sa structure de pages provient du générateur, tandis que le frontend conserve ses adaptations aux contrats réels de création, de modification et de réinitialisation des mots de passe. Le backend de sécurité conserve lui aussi son implémentation propre.

## Quand utiliser ce projet

- Pour montrer ou valider une application CRUD-like complète avec son backend.
- Pour amorcer un frontend à partir d'un core et de parcours déjà organisés.
- Pour éprouver une évolution de composant ou d'Action dans Engine.
- Pour construire des interfaces métier qui gardent une forme familière tout en recevant des adaptations locales.

Le contexte de démonstration et de POC du backend est compatible avec cette architecture UI plus élaborée. L'effort de chaque côté répond à ses besoins : simplicité des traitements serveur, composition et coordination des interactions dans le navigateur.

## Pour poursuivre

- [Guide de développement](DEVELOPMENT.md) : démarrage, configuration, contrats API, conventions TypeScript et vérifications.
- [Plan de suivi](update_plan.md) : chantiers frontend et limites déjà identifiées.
- [Backend](../crud-be/README.md) : responsabilités métier et arbitrages de la même application.
- [Engine](../engine/README.md) : hiérarchie des composants, actions transversales et comparaison des générations.
