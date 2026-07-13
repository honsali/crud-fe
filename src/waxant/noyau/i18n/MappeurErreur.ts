import { IErreurServeur, IInfoActionEchouee, IMessageErreur } from '../message/DomaineMessage';
import MappeurLibelle from './MappeurLibelle';

const mapContexteErreur = {
    'error.bad.request': ['Données Invalides', 'Veuillez corriger les erreurs suivantes:'],
    'error.validation.form': ['Données Invalides', 'Veuillez corriger les erreurs suivantes:'],
    'error.server.not.reachable': ['Problème technique', 'Le serveur ne répond pas, veuillez contacter votre administrateur'],
    'error.url.not.found': ['Problème technique', 'Ressource introuvable, veuillez contacter votre administrateur'],
    'error.server.error': ['Problème technique', 'Erreur Serveur, veuillez contacter votre administrateur'],
    'error.url.not.authorized': ['Problème technique', 'Vous N’avez pas les droits nécessaires pour accéder à cette ressource'],
    'error.request.timeout': ['Problème technique', 'Le service met trop de temps à répondre. Veuillez réessayer plus tard'],
};

const trouverLibelleErreur = (erreurServeur: IErreurServeur, mapErreur: Record<string, string>, mapLibelle: Record<string, string>): string => {
    let es = mapErreur[erreurServeur.code];
    if (!es) {
        return erreurServeur.libelle || erreurServeur.code;
    }

    if (erreurServeur.arguments?.length) {
        for (const arg of erreurServeur.arguments) {
            const erreurByArg = mapErreur[arg];
            if (erreurByArg) {
                return erreurByArg;
            }
            let al = MappeurLibelle.libelle(arg, mapLibelle, false);

            if (!al && arg?.includes('.')) {
                const idx = arg.indexOf('.');
                al = MappeurLibelle.libelle(arg.substring(idx + 1), mapLibelle, false);
            }

            if (al) {
                es += ` ${al}`;
            }
        }
    }
    return es;
};

const ajouterDetailsErreur = (messageErreur: IMessageErreur, listeErreurServeur: IErreurServeur[], listeErreurDirecte: string[], erreur: string, params: any[], mapErreur: Record<string, string>, mapLibelle: Record<string, string>) => {
    if (listeErreurServeur?.length) {
        messageErreur.listeErreur = listeErreurServeur.map((err) => trouverLibelleErreur(err, mapErreur, mapLibelle));
    }

    if (listeErreurDirecte?.length) {
        messageErreur.listeErreur.push(...listeErreurDirecte);
    }
    if (erreur) {
        const erreurTexte = mapErreur[erreur] || `[${erreur}]`;
        if (params?.length > 0) {
            messageErreur.listeErreur.push(formatMessage(erreurTexte, params));
        } else {
            messageErreur.listeErreur.push(erreurTexte);
        }
    }
};

const get = ({ code, listeErreurServeur, listeErreurDirecte, erreur, params }: IInfoActionEchouee, mapErreur: Record<string, string>, mapLibelle: Record<string, string>): IMessageErreur => {
    const codeErreur = typeof code === 'string' ? code : null;
    const e = codeErreur ? mapContexteErreur[codeErreur] : null;
    if (e) {
        const messageErreur: IMessageErreur = { titre: e[0], sousTitre: e[1], listeErreur: [] };
        ajouterDetailsErreur(messageErreur, listeErreurServeur, listeErreurDirecte, erreur, params, mapErreur, mapLibelle);
        return messageErreur;
    }

    const messageErreur: IMessageErreur = {
        titre: 'Problème technique',
        sousTitre: codeErreur && mapErreur[codeErreur] ? mapErreur[codeErreur] : 'Une erreur inattendue est survenue, veuillez contacter votre administrateur',
        listeErreur: [],
    };
    ajouterDetailsErreur(messageErreur, listeErreurServeur, listeErreurDirecte, erreur, params, mapErreur, mapLibelle);
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
