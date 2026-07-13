import { ActionEmploye } from 'modules/rh/employe/ActionEmploye';

export const aclEmploye = [

    ActionEmploye.UcConsulterConge.MODIFIER_CONGE,//
    ActionEmploye.UcConsulterConge.RETOUR_LISTE_CONGE,//
    ActionEmploye.UcConsulterConge.SUPPRIMER_CONGE,//

    ActionEmploye.UcConsulterEmploye.AJOUTER_CONGE,//
    ActionEmploye.UcConsulterEmploye.MODIFIER_EMPLOYE,//
    ActionEmploye.UcConsulterEmploye.RETOUR_LISTE_EMPLOYE,//
    ActionEmploye.UcConsulterEmploye.SUPPRIMER_EMPLOYE,//

    ActionEmploye.UcCreerConge.CREER_CONGE,//
    ActionEmploye.UcCreerConge.RETOUR_LISTE_CONGE,//

    ActionEmploye.UcCreerEmploye.CREER_EMPLOYE,//
    ActionEmploye.UcCreerEmploye.RETOUR_LISTE_EMPLOYE,//

    ActionEmploye.UcFiltrerEmploye.AJOUTER_EMPLOYE,//
    ActionEmploye.UcFiltrerEmploye.APPLIQUER_FILTRE_EMPLOYE,//
    ActionEmploye.UcFiltrerEmploye.INITIALISER_FILTRE_EMPLOYE,//

    ActionEmploye.UcModifierConge.INIT_MODIFICATION_CONGE,//
    ActionEmploye.UcModifierConge.MAJ_CONGE,//
    ActionEmploye.UcModifierConge.RETOUR_CONSULTER_CONGE,//

    ActionEmploye.UcModifierEmploye.INIT_MODIFICATION_EMPLOYE,//
    ActionEmploye.UcModifierEmploye.MAJ_EMPLOYE,//
    ActionEmploye.UcModifierEmploye.RETOUR_CONSULTER_EMPLOYE,//

];