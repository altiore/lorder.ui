import { routeProjectId } from '#/@store/router';

import { editProjectRoleAct } from '../actions';

export const editProjectRole = (roleId: number, data: { isPublic: boolean }) => async (dispatch, getState) => {
  const projectId = routeProjectId(getState());
  if (!projectId) {
    throw new Error('projectId is not found');
  }
  await dispatch(editProjectRoleAct(projectId, roleId, data));
};
