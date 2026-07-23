import _ from 'lodash';

export interface EtatMdl {
    enCours: boolean;
    succes: boolean;
    erreur?: boolean;
    rid?: string | null;
}


export const createEtatInit = (): EtatMdl => ({
    enCours: false,
    succes: false,
    erreur: false,
    rid: null,
});

export const createEtatSuccess = (): EtatMdl => ({
    enCours: false,
    succes: true,
    erreur: false,
    rid: null,
});

export const createEtatPending = (): EtatMdl => ({
    enCours: true,
    succes: false,
    erreur: false,
    rid: _.uniqueId(),
});

export const createEtatError = (): EtatMdl => ({
    enCours: false,
    succes: false,
    erreur: true,
    rid: null,
});


export const isEnCours = (etat: EtatMdl): boolean => etat.enCours;

export const isSuccess = (etat: EtatMdl): boolean => etat.succes;

export const isErreur = (etat: EtatMdl): boolean => !etat.succes && !!etat.erreur;

export const isInitial = (etat: EtatMdl): boolean =>
    !etat.enCours && !etat.succes && !etat.erreur;
