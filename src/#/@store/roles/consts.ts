import { ACCESS_LEVEL, ROLE } from '@types';

export const ROLES = {
  ADMINS: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
  ALL: [ROLE.GUEST, ROLE.USER, ROLE.ADMIN, ROLE.SUPER_ADMIN],
  GUESTS: [ROLE.GUEST],
  SUPER_ADMINS: [ROLE.SUPER_ADMIN],
  USERS: [ROLE.USER, ROLE.ADMIN, ROLE.SUPER_ADMIN],
};

export const CREATE_ROLE_FORM = 'CreateRoleForm';

export const isSuperAdmin = (
  access?: [ROLE | ROLE[], ACCESS_LEVEL, boolean] | [ROLE | ROLE[], ACCESS_LEVEL] | [ROLE | ROLE[]]
) => {
  if (Array.isArray(access) && access[0].length === 1) {
    if (access[0][0] === ROLE.SUPER_ADMIN) {
      return true;
    }
  }

  return false;
};
