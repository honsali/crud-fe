import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { IInfoActionEchouee, IInfoActionReussie, IMessageErreur } from '../message/DomaineMessage';
import MappeurErreur from './MappeurErreur';
import MappeurInfoActionReussie from './MappeurInfoActionReussie';
import MappeurLibelle from './MappeurLibelle';
import { erreurI18nSelecteur, infoActionI18nSelecteur, libelleI18nSelecteur } from './MdlI18n';

const useI18n = () => {
    const mapLibelleI18n = useSelector(libelleI18nSelecteur);
    const mapErreurI18n = useSelector(erreurI18nSelecteur);
    const mapInfoActionI18n = useSelector(infoActionI18nSelecteur);
    const i18n = useCallback(
        (key: string, safe?: boolean): string => {
            const lib = MappeurLibelle.libelle(key, mapLibelleI18n, safe);
            if (lib && lib.indexOf('[') === 0 && lib.indexOf('[id') < 0) {
                console.log(key + ' === ' + lib);
            }
            return lib;
        },
        [mapLibelleI18n]
    );

    const erreurI18n = useCallback(
        (key: IInfoActionEchouee): IMessageErreur => {
            return MappeurErreur.get(key, mapErreurI18n, mapLibelleI18n);
        },
        [mapErreurI18n]
    );

    const infoActionI18n = useCallback(
        (key: IInfoActionReussie): string => {
            return MappeurInfoActionReussie.get(key, mapInfoActionI18n, mapLibelleI18n) ?? '';
        },
        [mapLibelleI18n, mapInfoActionI18n]
    );

    const journalI18n = useCallback(
        (key: string): string => {
            return MappeurLibelle.journal(key, mapLibelleI18n);
        },
        [mapLibelleI18n]
    );

    return { i18n, erreurI18n, infoActionI18n, journalI18n };
};

export default useI18n;
