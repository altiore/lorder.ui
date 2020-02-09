import { requestActions } from '../@common/requestActions';
import { UserRole } from './UserRole';
import { CREATE_ROLE_FORM } from './consts';

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
  form: CREATE_ROLE_FORM,
}));

export const deleteRole = requestActions('ROLES/DELETE', (roleId: number) => ({
  request: {
    method: 'DELETE',
    url: `/roles/${roleId}`,
  },
  roleId,
}));

export const deleteManyRoles = requestActions('ROLES/DELETE_MANY', (roleIds: number[]) => ({
  request: {
    method: 'DELETE',
    url: '/roles/bulk',
    data: {
      ids: roleIds,
    },
  },
  roleIds,
}));
