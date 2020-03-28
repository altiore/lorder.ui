import { routeProjectId } from '#/@store/router';

import { createProjectRoleAct } from '../actions';

export const createProjectRole = (roleId: string) => async (dispatch, getState) => {
  const projectId = routeProjectId(getState());
  if (!projectId) {
    throw new Error('projectId is not found');
  }
  return await dispatch(createProjectRoleAct(projectId, roleId));
};
