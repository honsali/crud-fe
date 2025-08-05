import { ActionRh } from 'modules/rh/ActionRh';

export const aclRh = [

    ActionRh.UcConsulterDepartement.MODIFIER_DEPARTEMENT,//
    ActionRh.UcConsulterDepartement.RECUPERER_DEPARTEMENT_PAR_ID,//
    ActionRh.UcConsulterDepartement.RETOUR_LISTE_DEPARTEMENT,//

    ActionRh.UcCreerDepartement.CREER_DEPARTEMENT,//
    ActionRh.UcCreerDepartement.GO_TO_PAGE_CONSULTER_DEPARTEMENT,//
    ActionRh.UcCreerDepartement.RETOUR_LISTE_DEPARTEMENT,//

    ActionRh.UcListerDepartement.AJOUTER_DEPARTEMENT,//
    ActionRh.UcListerDepartement.GO_TO_PAGE_CONSULTER_DEPARTEMENT,//
    ActionRh.UcListerDepartement.LISTER_DEPARTEMENT,//

    ActionRh.UcModifierDepartement.ENREGISTRER_DEPARTEMENT,//
    ActionRh.UcModifierDepartement.GO_TO_PAGE_CONSULTER_DEPARTEMENT,//
    ActionRh.UcModifierDepartement.INIT_MODIFICATION_DEPARTEMENT,//
    ActionRh.UcModifierDepartement.RETOUR_CONSULTER_DEPARTEMENT,//

];