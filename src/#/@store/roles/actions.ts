import { createApiAction } from 'redux-actions-api';

import { CREATE_ROLE_FORM } from './consts';
import { UserRole } from './UserRole';

export const fetchRoles = createApiAction('ROLES/FETCH_ALL', () => ({
  request: {
    url: '/roles',
  },
}));

export const createRole = createApiAction('ROLES/CREATE_NEW', (data: Partial<UserRole>) => ({
  form: CREATE_ROLE_FORM,
  request: {
    data,
    method: 'POST',
    url: '/roles',
  },
}));

export const deleteRole = createApiAction('ROLES/DELETE', (roleId: number) => ({
  request: {
    method: 'DELETE',
    url: `/roles/${roleId}`,
  },
  roleId,
}));

export const deleteManyRoles = createApiAction('ROLES/DELETE_MANY', (roleIds: number[]) => ({
  request: {
    data: {
      ids: roleIds,
    },
    method: 'DELETE',
    url: '/roles/bulk',
  },
  roleIds,
}));
