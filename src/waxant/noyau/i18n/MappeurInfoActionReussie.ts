import _ from 'lodash';
import type { IInfoActionReussie } from '../message/DomaineMessage';
import MappeurLibelle from './MappeurLibelle';

const templateMap: Record<string, _.TemplateExecutor> = {
    'default.enregistrer': _.template('<%= libelleType %> a été modifié avec succès'),
    'default.creer': _.template('<%= libelleType %> a été créé avec succès'),
    'default.supprimer': _.template('<%= libelleType %> a été supprimé avec succès'),
    'default.valider': _.template('<%= libelleType %> a été validé avec succès'),
    'default.rejeter': _.template('<%= libelleType %> a été rejeté avec succès'),
};

const deduireKeyAction = (key: string, type: string): string => {
    if (key === 'fulfilled' && type.includes('.')) {
        return type.split('.').pop() ?? key;
    }
    return key;
};

const deduireLibelleTypeDepuisType = (type: string): string | null => {
    if (!type.startsWith('Ctrl')) {
        return null;
    }

    const deducedType = type.split(/(?=[A-Z])/);
    const actionPart = deducedType[1];
    if (!actionPart) {
        return null;
    }

    return type.substring('Ctrl'.length + actionPart.length) || null;
};

const deduireLibelleTypeDepuisKey = (keyAction: string, reducedKey: string): string | null => {
    if (!keyAction || !reducedKey || keyAction.length <= reducedKey.length) {
        return null;
    }
    return keyAction.substring(reducedKey.length);
};

const get = (
    infoActionReussie: IInfoActionReussie | null,
    mapMessage: Record<string, string>,
    mapLibelle: Record<string, string>,
): string | null => {
    if (!infoActionReussie?.key || !infoActionReussie.type) {
        return null;
    }

    const { key, type } = infoActionReussie;
    const messageTypeKey = `${type}.${key}`;
    const textFromMessage = mapMessage[messageTypeKey];
    if (textFromMessage) {
        return textFromMessage;
    }

    const textFromLabel = MappeurLibelle.libelle(messageTypeKey, mapLibelle, false);
    if (textFromLabel) {
        return textFromLabel;
    }

    const keyAction = deduireKeyAction(key, type);
    const reducedKey = keyAction.split(/(?=[A-Z])/)[0] ?? '';
    const compiledTemplate = templateMap[`default.${reducedKey}`];
    if (!compiledTemplate) {
        return null;
    }

    const libelleType = deduireLibelleTypeDepuisType(type)
        || deduireLibelleTypeDepuisKey(keyAction, reducedKey);
    return libelleType
        ? compiledTemplate({ key: keyAction, type, libelleType })
        : null;
};

const MappeurInfoActionReussie = {
    get,
};

export default MappeurInfoActionReussie;
