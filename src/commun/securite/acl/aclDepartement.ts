import { ActionDepartement } from 'modules/rh/departement/ActionDepartement';

export const aclDepartement = [

    ActionDepartement.UcConsulterDepartement.MODIFIER_DEPARTEMENT,//
    ActionDepartement.UcConsulterDepartement.RECUPERER_DEPARTEMENT_PAR_ID,//
    ActionDepartement.UcConsulterDepartement.RETOUR_LISTE_DEPARTEMENT,//
    ActionDepartement.UcConsulterDepartement.SUPPRIMER_DEPARTEMENT,//

    ActionDepartement.UcCreerDepartement.CREER_DEPARTEMENT,//
    ActionDepartement.UcCreerDepartement.RETOUR_LISTE_DEPARTEMENT,//

    ActionDepartement.UcListerDepartement.AJOUTER_DEPARTEMENT,//
    ActionDepartement.UcListerDepartement.LISTER_DEPARTEMENT,//

    ActionDepartement.UcModifierDepartement.MAJ_DEPARTEMENT,//
    ActionDepartement.UcModifierDepartement.RECUPERER_DEPARTEMENT_PAR_ID,//
    ActionDepartement.UcModifierDepartement.RETOUR_CONSULTER_DEPARTEMENT,//

];