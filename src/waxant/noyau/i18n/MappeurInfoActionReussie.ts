import _ from 'lodash';
import util from '../../noyau/util/util';
import { IInfoActionReussie } from '../message/DomaineMessage';
import MappeurLibelle from './MappeurLibelle';

const templateMap = {
    'default.enregistrer': _.template('<%= libelleType %> a été modifié avec succès'),
    'default.creer': _.template('<%= libelleType %>  a été créé avec succès'),
    'default.supprimer': _.template('<%= libelleType %> a été supprimée avec succès'),
    'default.valider': _.template('<%= libelleType %> a été validé avec succès'),
    'default.rejeter': _.template('<%= libelleType %> a été rejeté avec succès'),
};

const deduireKeyAction = (key: string, type: string): string => {
    if (key === 'fulfilled' && type?.includes('.')) {
        return type.split('.').pop();
    }

    return key;
};

const deduireLibelleTypeDepuisType = (type: string): string | null => {
    if (!type?.startsWith('Ctrl')) {
        return null;
    }

    const deducedType = type.split(/(?=[A-Z])/);
    if (!deducedType[1]) {
        return null;
    }

    const libelleType = type.substring('Ctrl'.length + deducedType[1].length);
    return libelleType || null;
};

const deduireLibelleTypeDepuisKey = (keyAction: string, reducedKey: string): string | null => {
    if (!keyAction || !reducedKey || keyAction.length <= reducedKey.length) {
        return null;
    }

    return keyAction.substring(reducedKey.length);
};

const get = (infoActionReussie: IInfoActionReussie, mapMessage: Record<string, string>, mapLibelle: Record<string, string>): string | null => {
    if (util.estNul(infoActionReussie?.key) || util.estNul(infoActionReussie?.type)) {
        return null;
    }

    const { key, type } = infoActionReussie;
    const messageTypeKey = `${type}.${key}`;

    const textFromMessage = mapMessage[messageTypeKey];
    if (util.nonNul(textFromMessage)) {
        return textFromMessage;
    }
    const texteFromLibelle = MappeurLibelle.libelle(messageTypeKey, mapLibelle, false);
    if (util.nonNul(texteFromLibelle)) {
        return texteFromLibelle;
    }

    const keyAction = deduireKeyAction(key, type);
    const reducedKey = keyAction.split(/(?=[A-Z])/)[0];
    const compiledTemplateForReducedKey = templateMap[`default.${reducedKey}`];
    if (!compiledTemplateForReducedKey) {
        return null;
    }

    const libelleType = deduireLibelleTypeDepuisType(type) || deduireLibelleTypeDepuisKey(keyAction, reducedKey);
    if (!libelleType) {
        return null;
    }

    return compiledTemplateForReducedKey({ key: keyAction, type, libelleType });
};

const MappeurInfoActionReussie = {
    get,
};

export default MappeurInfoActionReussie;
