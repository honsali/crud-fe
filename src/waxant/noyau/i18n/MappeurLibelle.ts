import _ from 'lodash';
import util from '../util/util';

const libelle = (key: string, mapLibelle: Record<string, string>, safe = true): string => {
    if (util.estNul(key)) {
        return safe ? '[]' : null;
    }
    switch (key) {
        case '_vide':
            return '\xA0';
        case 'libelle':
            return 'Libelle';
        case 'code':
            return 'Code';
        default:
            if (key.startsWith('libelle')) {
                const filteredKey = key.charAt(7).toLowerCase() + key.slice(8);
                return mapLibelle[filteredKey] || (safe ? `[${filteredKey}]` : null);
            }
            return mapLibelle[key] || (safe ? `[${key}]` : null);
    }
};

const journal = (key: string, mapActionCtrl: Record<string, string>): string => {
    if (util.estNul(key)) {
        return '[]';
    }
    return (
        mapActionCtrl[key] ||
        _.capitalize(
            key
                .split('/')
                .pop()
                .split(/(?=[A-Z])/)
                .join(' ')
        )
    );
};

const MappeurLibelle = {
    libelle,
    journal,
};

export default MappeurLibelle;
