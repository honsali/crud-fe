import { ActionDepartement } from 'modules/rh/departement/ActionDepartement';

export const aclDepartement = [

    ActionDepartement.UcConsulterDepartement.MODIFIER_DEPARTEMENT,//
    ActionDepartement.UcConsulterDepartement.RETOUR_LISTE_DEPARTEMENT,//
    ActionDepartement.UcConsulterDepartement.SUPPRIMER_DEPARTEMENT,//

    ActionDepartement.UcCreerDepartement.CREER_DEPARTEMENT,//
    ActionDepartement.UcCreerDepartement.RETOUR_LISTE_DEPARTEMENT,//

    ActionDepartement.UcListerDepartement.AJOUTER_DEPARTEMENT,//

    ActionDepartement.UcModifierDepartement.INIT_MODIFICATION_DEPARTEMENT,//
    ActionDepartement.UcModifierDepartement.MAJ_DEPARTEMENT,//
    ActionDepartement.UcModifierDepartement.RETOUR_CONSULTER_DEPARTEMENT,//

];