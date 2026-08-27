import { aclAccount } from './acl/aclAccount';
import { aclCommun } from './acl/aclCommun';
import { aclDepartement } from './acl/aclDepartement';
import { aclEmploye } from './acl/aclEmploye';
import { ROLE_ADMIN, ROLE_GESTIONNAIRE_RH } from './mapRole';

const ACL_COMMUN = [
    ...aclCommun
];

const ACL_RH = [
    ...ACL_COMMUN,
    ...aclDepartement,
    ...aclEmploye
];
const ACL_ADMIN = [
    ...ACL_COMMUN,
    ...aclAccount
];

const mapDroitAcces: Record<string, string[]> = {
    [ROLE_GESTIONNAIRE_RH]: ACL_RH,
    [ROLE_ADMIN]: ACL_ADMIN,
};

export default mapDroitAcces;
