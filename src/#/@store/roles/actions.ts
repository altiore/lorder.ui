import { requestActions } from '../@common/requestActions';
import { CREATE_ROLE_FORM } from './consts';
import { UserRole } from './UserRole';

export const fetchRoles = requestActions('ROLES/FETCH_ALL', () => ({
  request: {
    url: '/roles',
  },
}));

export const createRole = requestActions('ROLES/CREATE_NEW', (data: Partial<UserRole>) => ({
  form: CREATE_ROLE_FORM,
  request: {
    data,
    method: 'POST',
    url: '/roles',
  },
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
    data: {
      ids: roleIds,
    },
    method: 'DELETE',
    url: '/roles/bulk',
  },
  roleIds,
}));
