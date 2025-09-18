import { ActionEmploye } from 'modules/rh/employe/ActionEmploye';

export const aclEmploye = [

    ActionEmploye.UcConsulterEmploye.AJOUTER_CONGE,//
    ActionEmploye.UcConsulterEmploye.GO_TO_PAGE_FILTRER_EMPLOYE,//
    ActionEmploye.UcConsulterEmploye.LISTER_CONGE_PAR_ID_EMPLOYE,//
    ActionEmploye.UcConsulterEmploye.MODIFIER_EMPLOYE,//
    ActionEmploye.UcConsulterEmploye.RECUPERER_EMPLOYE_PAR_ID,//
    ActionEmploye.UcConsulterEmploye.RETOUR_LISTE_EMPLOYE,//
    ActionEmploye.UcConsulterEmploye.SUPPRIMER_EMPLOYE,//

    ActionEmploye.UcCreerEmploye.CREER_EMPLOYE,//
    ActionEmploye.UcCreerEmploye.GO_TO_PAGE_CONSULTER_EMPLOYE,//
    ActionEmploye.UcCreerEmploye.RETOUR_LISTE_EMPLOYE,//

    ActionEmploye.UcFiltrerEmploye.AJOUTER_EMPLOYE,//
    ActionEmploye.UcFiltrerEmploye.APPLIQUER_FILTRE_EMPLOYE,//
    ActionEmploye.UcFiltrerEmploye.CHANGER_PAGE_FILTRER_EMPLOYE,//
    ActionEmploye.UcFiltrerEmploye.FILTRER_EMPLOYE,//
    ActionEmploye.UcFiltrerEmploye.GO_TO_PAGE_CONSULTER_EMPLOYE,//
    ActionEmploye.UcFiltrerEmploye.INITIALISER_FILTRE_EMPLOYE,//
    ActionEmploye.UcFiltrerEmploye.INITIALISER_FILTRER_EMPLOYE,//

    ActionEmploye.UcModifierConge.GO_TO_PAGE_CONSULTER_DEPARTEMENT,//
    ActionEmploye.UcModifierConge.MAJ_CONGE,//
    ActionEmploye.UcModifierConge.RECUPERER_CONGE_PAR_ID,//
    ActionEmploye.UcModifierConge.RETOUR_CONSULTER_CONGE,//

    ActionEmploye.UcModifierEmploye.GO_TO_PAGE_CONSULTER_EMPLOYE,//
    ActionEmploye.UcModifierEmploye.MAJ_EMPLOYE,//
    ActionEmploye.UcModifierEmploye.RECUPERER_EMPLOYE_PAR_ID,//
    ActionEmploye.UcModifierEmploye.RETOUR_CONSULTER_EMPLOYE,//

];