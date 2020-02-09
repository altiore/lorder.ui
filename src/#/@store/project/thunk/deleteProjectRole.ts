import { routeProjectId } from '#/@store/router';
import { deleteProjectRoleAct } from '../actions';

export const deleteProjectRole = (roleId: string) => async (dispatch, getState) => {
  const projectId = routeProjectId(getState());
  if (!projectId) {
    throw new Error('projectId is not found');
  }
  return await dispatch(deleteProjectRoleAct(projectId, roleId));
};
