import util from 'waxant/noyau/util/util';
import useI18n from '../../noyau/i18n/useI18n';

const useFormConverter = () => {

    const { i18n } = useI18n();
    const convert = (cprops) => {
        if (cprops.nom) {
            const attributes = {} as any;
            attributes.name = cprops.nom;
            attributes.label = cprops.libelle || i18n(cprops.nom);
            attributes.uname = util.capitalize(attributes.name);
            attributes.entite = cprops.entite;
            attributes.style = cprops.style;
            attributes.arg = cprops.arg;
            return attributes;
        } else {
            return { ...cprops };
        }
    };

    return convert;
};

export default useFormConverter;
