import { IErreurServeur, IInfoActionEchouee, IMessageErreur } from '../message/DomaineMessage';
import MappeurLibelle from './MappeurLibelle';

const mapContexteErreur = {
    'error.bad.request': ['Données Invalides', 'Veuillez corriger les erreurs suivantes:'],
    'error.validation.form': ['Données Invalides', 'Veuillez corriger les erreurs suivantes:'],
    'error.server.not.reachable': ['Problème technique', 'Le serveur ne répond pas, veuillez contacter votre administrateur'],
    'error.url.not.found': ['Problème technique', 'Ressource introuvable, veuillez contacter votre administrateur'],
    'error.server.error': ['Problème technique', 'Erreur Serveur, veuillez contacter votre administrateur'],
    'error.url.not.authorized': ['Problème technique', 'Vous N avez pas les droits nécessaires pour accéder à cette ressource'],
};

const trouverLibelleErreur = (erreurServeur: IErreurServeur, mapErreur: Record<string, string>, mapLibelle: Record<string, string>): string => {
    let es = mapErreur[erreurServeur.code];
    if (!es) {
        return erreurServeur.libelle || erreurServeur.code;
    }

    if (erreurServeur.arguments?.length) {
        for (const arg of erreurServeur.arguments) {
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
    const e = mapContexteErreur[code];
    if (e) {
        const messageErreur: IMessageErreur = { titre: e[0], sousTitre: e[1], listeErreur: [] };
        if (listeErreurServeur?.length) {
            messageErreur.listeErreur = listeErreurServeur.map((err) => trouverLibelleErreur(err, mapErreur, mapLibelle));
        }

        if (listeErreurDirecte?.length) {
            messageErreur.listeErreur.push(...listeErreurDirecte);
        }
        if (erreur) {
            const erreurTexte = mapErreur[erreur] || `[${erreur}]`;
            messageErreur.listeErreur.push(erreurTexte);
        }

        return messageErreur;
    }
    return { titre: 'ERROR', sousTitre: JSON.stringify({ code, listeErreurServeur, listeErreurDirecte, erreur }), listeErreur: [] };
};
const MappeurErreur = {
    get,
};

export default MappeurErreur;
