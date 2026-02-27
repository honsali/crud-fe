import { ActionEmploye } from 'modules/rh/employe/ActionEmploye';

export const aclEmploye = [

    ActionEmploye.UcConsulterConge.MODIFIER_CONGE,//
    ActionEmploye.UcConsulterConge.RETOUR_LISTE_CONGE,//
    ActionEmploye.UcConsulterConge.SUPPRIMER_CONGE,//

    ActionEmploye.UcConsulterEmploye.AJOUTER_CONGE,//
    ActionEmploye.UcConsulterEmploye.LISTER_CONGE_PAR_ID_EMPLOYE,//
    ActionEmploye.UcConsulterEmploye.MODIFIER_EMPLOYE,//
    ActionEmploye.UcConsulterEmploye.RECUPERER_EMPLOYE_PAR_ID,//
    ActionEmploye.UcConsulterEmploye.RETOUR_LISTE_EMPLOYE,//
    ActionEmploye.UcConsulterEmploye.SUPPRIMER_EMPLOYE,//

    ActionEmploye.UcCreerConge.CREER_CONGE,//
    ActionEmploye.UcCreerConge.RETOUR_LISTE_CONGE,//

    ActionEmploye.UcCreerEmploye.CREER_EMPLOYE,//
    ActionEmploye.UcCreerEmploye.RETOUR_LISTE_EMPLOYE,//

    ActionEmploye.UcFiltrerEmploye.AJOUTER_EMPLOYE,//
    ActionEmploye.UcFiltrerEmploye.APPLIQUER_FILTRE_EMPLOYE,//
    ActionEmploye.UcFiltrerEmploye.CHANGER_PAGE_FILTRER_EMPLOYE,//
    ActionEmploye.UcFiltrerEmploye.FILTRER_EMPLOYE,//
    ActionEmploye.UcFiltrerEmploye.INITIALISER_FILTRE_EMPLOYE,//
    ActionEmploye.UcFiltrerEmploye.INITIALISER_FILTRER_EMPLOYE,//

    ActionEmploye.UcModifierConge.MAJ_CONGE,//
    ActionEmploye.UcModifierConge.RECUPERER_CONGE_PAR_ID,//
    ActionEmploye.UcModifierConge.RETOUR_CONSULTER_CONGE,//

    ActionEmploye.UcModifierEmploye.MAJ_EMPLOYE,//
    ActionEmploye.UcModifierEmploye.RECUPERER_EMPLOYE_PAR_ID,//
    ActionEmploye.UcModifierEmploye.RETOUR_CONSULTER_EMPLOYE,//

];