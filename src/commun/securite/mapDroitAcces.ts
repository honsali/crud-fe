import { aclCommun } from './acl/aclCommun';
import { aclDepartement } from './acl/aclDepartement';
import { aclEmploye } from './acl/aclEmploye';
import { ROLE_ADMIN, ROLE_INVITE } from './mapRole';

const ALL = [
    ...aclCommun
];

const CONSULTATION = [
    ...aclDepartement, ...aclEmploye
];

const EDITION = [
];

const ADMIN = [
];

const ACL_CONSULTATION = [...ALL, ...CONSULTATION];
const ACL_ADMIN = [...ALL, ...EDITION, ...ADMIN];
const mapDroitAcces = {
    [ROLE_INVITE]: ACL_CONSULTATION,
    [ROLE_ADMIN]: ACL_ADMIN,
};

export default mapDroitAcces;
