import { requestActions } from '../@common/requestActions';
import { UserRole } from './UserRole';

export const fetchRoles = requestActions('ROLES/FETCH_ALL', () => ({
  request: {
    url: '/roles',
  },
}));

export const createRole = requestActions('ROLES/CREATE_NEW', (data: Partial<UserRole>) => ({
  request: {
    method: 'POST',
    url: '/roles',
    data,
  },
  form: 'createUserRolesForm',
}));

export const deleteRole = requestActions('ROLES/DELETE', (roleId: number) => ({
  request: {
    method: 'DELETE',
    url: `/roles/${roleId}`,
  },
  roleId,
}));
