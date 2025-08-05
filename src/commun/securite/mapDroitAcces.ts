import { aclCommun } from './acl/aclCommun';
import { aclRh } from './acl/aclRh';
import { ROLE_ADMIN, ROLE_INVITE } from './mapRole';

const ALL = [
    ...aclCommun
];

const CONSULTATION = [
    ...aclRh
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
