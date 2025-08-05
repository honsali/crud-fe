import _ from 'lodash';
import useI18n from '../../noyau/i18n/useI18n';
import util from '../../noyau/util/util';

const useFormConverter = () => {
    const { i18n } = useI18n();
    const convert = (nom, cprops) => {
        const cname = cprops.nom ? cprops.nom : cprops.reference;
        if (cname) {
            const attributes = {} as any;
            const i = cname.lastIndexOf('.');
            attributes.name = i > 0 ? _.split(cname, '.') : cname;
            if (cprops.libelle) {
                attributes.label = cprops.libelle === 'vide' ? null : cprops.libelle;
            } else {
                const label = i > 0 ? cname.substr(i + 1) : cname;
                attributes.label = i18n(label);
            }

            if (_.isArray(attributes.name)) {
                const array = _.clone(attributes.name);
                attributes.lname = array[array.length - 1];
                attributes.slabel = i18n(attributes.lname);
                array[array.length - 1] = array[array.length - 1] + '_libelle';
                attributes.sname = array;
            } else {
                attributes.slabel = i18n(attributes.name);
                attributes.sname = attributes.name + '_libelle';
                attributes.lname = attributes.name;
            }
            attributes.cls = (nom ? nom + '_' : '') + attributes.lname;
            attributes.entite = cprops.entite;
            attributes.requis = cprops.requis;
            attributes.style = cprops.style;
            attributes.arg = cprops.arg;
            attributes.onChange = cprops.siChange;
            attributes.disabled = cprops.disabled;
            attributes.placeholder = cprops.placeholder;
            attributes.validateStatus = util.nonVide(cprops.erreur) ? 'error' : null;
            attributes.help = cprops.erreur;
            return attributes;
        } else {
            return { ...cprops };
        }
    };

    return convert;
};

export default useFormConverter;
