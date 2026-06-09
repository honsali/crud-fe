import { aclCommun } from './acl/aclCommun';
import { aclModule } from './acl/aclModule';
import { aclPage } from './acl/aclPage';
import { ROLE_ADMIN, ROLE_INVITE } from './mapRole';

const ALL = [
    ...aclCommun
];


const EDITION = [
    ...aclPage,
    ...aclModule,
];

const ADMIN = [
];

const ACL_ADMIN = [...ALL, ...EDITION, ...ADMIN];
const mapDroitAcces = {
    [ROLE_INVITE]: ACL_ADMIN,
    [ROLE_ADMIN]: ACL_ADMIN,
};

export default mapDroitAcces;
