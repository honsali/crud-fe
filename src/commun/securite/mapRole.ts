export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_GESTIONNAIRE_RH = 'ROLE_GESTIONNAIRE_RH';

export type AppRole = typeof ROLE_ADMIN | typeof ROLE_GESTIONNAIRE_RH;

const mapRole: Record<AppRole, AppRole> = {
    [ROLE_ADMIN]: ROLE_ADMIN,
    [ROLE_GESTIONNAIRE_RH]: ROLE_GESTIONNAIRE_RH,
};

export default mapRole;
