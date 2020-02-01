import { createAction } from 'redux-actions';
import { requestActions } from '../@common/requestActions';

export const selectProject = createAction('CURRENT_PROJECT/SELECT');

export const fetchProjectRolesAct = requestActions('CURRENT_PROJECT/FETCH_ROLES', projectId => ({
  request: {
    url: `/projects/${projectId}/roles`,
  },
}));

export const deleteProjectRoleAct = requestActions<any, number, number>(
  'CURRENT_PROJECT/DELETE_ROLE',
  (projectId, roleId) => ({
    request: {
      method: 'DELETE',
      url: `/projects/${projectId}/roles/${roleId}`,
    },
  })
);
