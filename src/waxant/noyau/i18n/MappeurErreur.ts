import type { IErreurServeur, IInfoActionEchouee, IMessageErreur } from '../message/DomaineMessage';
import MappeurLibelle from './MappeurLibelle';

type ErrorContext = readonly [title: string, subtitle: string];

const mapContexteErreur: Record<string, ErrorContext> = {
    'error.bad.request': ['Données invalides', 'Veuillez corriger les erreurs suivantes :'],
    'error.validation.form': ['Données invalides', 'Veuillez corriger les erreurs suivantes :'],
    'error.server.not.reachable': ['Problème technique', 'Le serveur ne répond pas, veuillez contacter votre administrateur.'],
    'error.url.not.found': ['Ressource introuvable', "La ressource demandée n'existe pas."],
    'error.server.error': ['Problème technique', 'Une erreur serveur est survenue, veuillez contacter votre administrateur.'],
    'error.url.not.authorized': ['Accès refusé', "Vous n'avez pas les droits nécessaires pour accéder à cette ressource."],
    'error.request.timeout': ['Problème technique', 'Le service met trop de temps à répondre. Veuillez réessayer plus tard.'],
};

const trouverLibelleErreur = (
    erreurServeur: IErreurServeur,
    mapErreur: Record<string, string>,
    mapLibelle: Record<string, string>,
): string => {
    const code = erreurServeur.code ?? '';
    let message = mapErreur[code];
    if (!message) {
        return erreurServeur.libelle || code || 'Erreur de validation';
    }

    for (const argument of erreurServeur.arguments ?? []) {
        const erreurByArgument = mapErreur[argument];
        if (erreurByArgument) {
            return erreurByArgument;
        }

        let argumentLabel = MappeurLibelle.libelle(argument, mapLibelle, false);
        if (!argumentLabel && argument.includes('.')) {
            argumentLabel = MappeurLibelle.libelle(argument.substring(argument.indexOf('.') + 1), mapLibelle, false);
        }
        if (argumentLabel) {
            message += ` ${argumentLabel}`;
        }
    }
    return message;
};

const ajouterDetailsErreur = (
    messageErreur: IMessageErreur,
    listeErreurServeur: IErreurServeur[] = [],
    listeErreurDirecte: string[] = [],
    erreur?: string,
    params: any[] = [],
    mapErreur: Record<string, string> = {},
    mapLibelle: Record<string, string> = {},
) => {
    const details = messageErreur.listeErreur ?? [];
    details.push(...listeErreurServeur.map((item) => trouverLibelleErreur(item, mapErreur, mapLibelle)));
    details.push(...listeErreurDirecte);

    if (erreur) {
        const erreurTexte = mapErreur[erreur] || `[${erreur}]`;
        details.push(params.length > 0 ? formatMessage(erreurTexte, params) : erreurTexte);
    }
    messageErreur.listeErreur = details;
};

const get = (
    { code, listeErreurServeur, listeErreurDirecte, erreur, params }: IInfoActionEchouee,
    mapErreur: Record<string, string>,
    mapLibelle: Record<string, string>,
): IMessageErreur => {
    const context = code ? mapContexteErreur[code] : undefined;
    const messageErreur: IMessageErreur = context
        ? { titre: context[0], sousTitre: context[1], listeErreur: [] }
        : {
            titre: 'Problème technique',
            sousTitre: code && mapErreur[code]
                ? mapErreur[code]
                : 'Une erreur inattendue est survenue, veuillez contacter votre administrateur.',
            listeErreur: [],
        };

    ajouterDetailsErreur(
        messageErreur,
        listeErreurServeur,
        listeErreurDirecte,
        erreur,
        params,
        mapErreur,
        mapLibelle,
    );
    return messageErreur;
};

const formatMessage = (template: string, params: Array<string | number>) => {
    return template.replace(/{(\d+)}/g, (match, index) => {
        const value = params[Number(index)];
        return value !== undefined ? String(value) : match;
    });
};

const MappeurErreur = {
    get,
};

export default MappeurErreur;
