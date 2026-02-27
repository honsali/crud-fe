import type { IErreurServeur, IInfoActionEchouee, IMessageErreur } from '../message/DomaineMessage';
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
    const code = erreurServeur.code ?? '';
    let es = code ? mapErreur[code] : undefined;
    if (!es) {
        return erreurServeur.libelle || code || '';
    }

    if (erreurServeur.arguments?.length) {
        for (const arg of erreurServeur.arguments) {
            const erreorByArg = mapErreur[arg];
            if (erreorByArg) {
                return erreorByArg;
            }
            let al = MappeurLibelle.libelle(arg, mapLibelle, false);

            if (!al && arg.includes('.')) {
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

const get = ({ code, listeErreurServeur, listeErreurDirecte, erreur }: IInfoActionEchouee, mapErreur: Record<string, string>, mapLibelle: Record<string, string>): IMessageErreur => {
    const codeKey = code ?? '';
    const e = codeKey ? mapContexteErreur[codeKey] : undefined;
    if (e) {
        const listeErreur: string[] = [];
        const messageErreur: IMessageErreur = { titre: e[0], sousTitre: e[1], listeErreur };
        if (listeErreurServeur?.length) {
            listeErreur.push(...listeErreurServeur.map((err) => trouverLibelleErreur(err, mapErreur, mapLibelle)));
        }

        if (listeErreurDirecte?.length) {
            listeErreur.push(...listeErreurDirecte);
        }
        if (erreur) {
            const erreurTexte = mapErreur[erreur] || `[${erreur}]`;
            listeErreur.push(erreurTexte);
        }

        return messageErreur;
    }
    return { titre: 'ERROR', sousTitre: JSON.stringify({ code, listeErreurServeur, listeErreurDirecte, erreur }), listeErreur: [] };
};
const MappeurErreur = {
    get,
};

export default MappeurErreur;
