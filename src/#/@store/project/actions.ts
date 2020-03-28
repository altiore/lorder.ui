import { createAction } from 'redux-actions';

import { requestActions } from '../@common/requestActions';

export const selectProject = createAction('CURRENT_PROJECT/SELECT');

export const fetchProjectRolesAct = requestActions('CURRENT_PROJECT/FETCH_ROLES', projectId => ({
  request: {
    url: `/projects/${projectId}/roles`,
  },
}));

export const createProjectRoleAct = requestActions('CURRENT_PROJECT/ADD_ROLE', (projectId: number, roleId: string) => ({
  request: {
    data: { roleId },
    method: 'POST',
    url: `/projects/${projectId}/roles`,
  },
}));

export const deleteProjectRoleAct = requestActions(
  'CURRENT_PROJECT/DELETE_ROLE',
  (projectId: number, roleId: string) => ({
    request: {
      method: 'DELETE',
      url: `/projects/${projectId}/roles/${roleId}`,
    },
  })
);
