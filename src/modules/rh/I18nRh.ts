import { enteteConfirmation, messageSuccess, titreConfirmation } from 'waxant';
import { ActionRh } from './ActionRh';

export const I18nRh = {
    PageConsulterDepartement: 'Consulter Departement',
    'UcConsulterDepartement.titre': 'Consulter Departement',
    [ActionRh.UcConsulterDepartement.MODIFIER_DEPARTEMENT]: 'Modifier',
    [ActionRh.UcConsulterDepartement.RETOUR_LISTE_DEPARTEMENT]: 'Retour Liste',
    PageCreerDepartement: 'Créer Departement',
    'UcCreerDepartement.titre': 'Créer Departement',
    [ActionRh.UcCreerDepartement.CREER_DEPARTEMENT]: 'Enregistrer',
    [titreConfirmation(ActionRh.UcCreerDepartement.CREER_DEPARTEMENT)]: 'Créer Departement',
    [enteteConfirmation(ActionRh.UcCreerDepartement.CREER_DEPARTEMENT)]: 'Etes vous sur de vouloir créer ce Departement',
    [messageSuccess(ActionRh.UcCreerDepartement.CREER_DEPARTEMENT)]: 'Departement créé avec succès',
    [ActionRh.UcCreerDepartement.RETOUR_LISTE_DEPARTEMENT]: 'Retour Liste',
    PageListerDepartement: 'Liste Departements',
    'UcListerDepartement.titre': 'Liste Departements',
    [ActionRh.UcListerDepartement.AJOUTER_DEPARTEMENT]: 'Nouveau Departement',
    PageModifierDepartement: 'Modifier Departement',
    'UcModifierDepartement.titre': 'Modifier Departement',
    [ActionRh.UcModifierDepartement.ENREGISTRER_DEPARTEMENT]: 'Enregistrer',
    [titreConfirmation(ActionRh.UcModifierDepartement.ENREGISTRER_DEPARTEMENT)]: 'Enregistrer Departement',
    [enteteConfirmation(ActionRh.UcModifierDepartement.ENREGISTRER_DEPARTEMENT)]: 'Etes vous sur de vouloir enregistrer ce Departement',
    [messageSuccess(ActionRh.UcModifierDepartement.ENREGISTRER_DEPARTEMENT)]: 'Departement enregistré avec succès',
    [ActionRh.UcModifierDepartement.RETOUR_CONSULTER_DEPARTEMENT]: 'Retour',
    'aucun.departement': 'Aucun Departement',
    description: 'Description',
    nom: 'Nom',
};