import { ActionAccount } from 'modules/admin/account/ActionAccount';

export const aclAccount = [
    ActionAccount.UcConsulterAccount.MODIFIER_ACCOUNT,
    ActionAccount.UcConsulterAccount.REINITIALISER_MOT_DE_PASSE_ACCOUNT,
    ActionAccount.UcConsulterAccount.RETOUR_LISTE_ACCOUNT,
    ActionAccount.UcCreerAccount.CREER_ACCOUNT,
    ActionAccount.UcCreerAccount.RETOUR_LISTE_ACCOUNT,
    ActionAccount.UcListerAccount.AJOUTER_ACCOUNT,
    ActionAccount.UcModifierAccount.INIT_MODIFICATION_ACCOUNT,
    ActionAccount.UcModifierAccount.MAJ_ACCOUNT,
    ActionAccount.UcModifierAccount.RETOUR_CONSULTER_ACCOUNT,
];
