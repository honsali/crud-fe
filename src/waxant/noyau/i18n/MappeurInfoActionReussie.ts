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

const get = (infoActionReussie: IInfoActionReussie, mapMessage: Record<string, string>, mapLibelle: Record<string, string>): string | null => {
    if (util.estNul(infoActionReussie?.key)) {
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

    const reducedKey = key.split(/(?=[A-Z])/)[0];
    const deducedType = type.split(/(?=[A-Z])/);
    const compiledTemplateForReducedKey = templateMap[`default.${reducedKey}`];
    if (compiledTemplateForReducedKey) {
        return compiledTemplateForReducedKey({ key, type, libelleType: type.substring(4 + deducedType[1].length) });
    }


    return null;
};

const MappeurInfoActionReussie = {
    get,
};

export default MappeurInfoActionReussie;
