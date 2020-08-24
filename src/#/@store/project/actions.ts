import { createAction } from 'redux-actions';

import { requestActions } from '#/@store/@common/requestActions';

export const selectProject = createAction('CURRENT_PROJECT/SELECT');

export const fetchProjectRolesAct = requestActions('CURRENT_PROJECT/FETCH_ROLES', projectId => ({
  request: {
    url: `/projects/${projectId}/roles`,
  },
}));

export const createProjectRoleAct = requestActions(
  'CURRENT_PROJECT/ADD_ROLE',
  (projectId: number, data: { roleId: string; allowedMoveIds?: number[]; name?: string }) => ({
    form: 'CreateProjectRoleForm',
    request: {
      data: {
        allowedMoveIds: [],
        ...data,
      },
      method: 'POST',
      url: `/projects/${projectId}/roles`,
    },
  })
);

export const editProjectRoleAct = requestActions(
  'CURRENT_PROJECT/EDIT_ROLE',
  (projectId: number, roleId: number, data: { isPublic: boolean }) => ({
    form: 'CreateProjectRoleForm',
    request: {
      data,
      method: 'PATCH',
      url: `/projects/${projectId}/roles/${roleId}`,
    },
  })
);

export const deleteProjectRoleAct = requestActions(
  'CURRENT_PROJECT/DELETE_ROLE',
  (projectId: number, roleId: string) => ({
    request: {
      method: 'DELETE',
      url: `/projects/${projectId}/roles/${roleId}`,
    },
  })
);
