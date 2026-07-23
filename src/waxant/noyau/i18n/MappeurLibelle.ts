import _ from 'lodash';

const PREFIXE_LIBELLE = 'libelle';

const libelle = (key: string, mapLibelle: Record<string, string>, safe = true): string => {
    if (!key) {
        return safe ? '[]' : '';
    }

    switch (key) {
        case '_vide':
            return '\xA0';
        case 'libelle':
            return 'Libelle';
        case 'code':
            return 'Code';
        default: {
            if (key.startsWith(PREFIXE_LIBELLE)) {
                const suffixe = key.slice(PREFIXE_LIBELLE.length);
                const filteredKey = suffixe.charAt(0).toLowerCase() + suffixe.slice(1);
                return mapLibelle[filteredKey] ?? (safe ? `[${filteredKey}]` : '');
            }
            return mapLibelle[key] ?? (safe ? `[${key}]` : '');
        }
    }
};

const journal = (key: string, mapActionCtrl: Record<string, string>): string => {
    if (!key) {
        return '[]';
    }

    const actionName = key.split('/').pop() ?? key;
    return mapActionCtrl[key]
        ?? _.capitalize(actionName.split(/(?=[A-Z])/).join(' '));
};

const MappeurLibelle = {
    libelle,
    journal,
};

export default MappeurLibelle;
