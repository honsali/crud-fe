import _ from 'lodash';
import util from '../util/util';

const PREFIXE_LIBELLE = 'libelle';

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
            if (key.startsWith(PREFIXE_LIBELLE)) {
                const suffixe = key.slice(PREFIXE_LIBELLE.length);
                const filteredKey = suffixe.charAt(0).toLowerCase() + suffixe.slice(1);
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
