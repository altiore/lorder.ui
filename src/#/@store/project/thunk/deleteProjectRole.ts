import { routeProjectId } from '#/@store/router';
import { deleteProjectRoleAct } from '../actions';

export const deleteProjectRole = (roleId: number) => async (dispatch, getState) => {
  const projectId = routeProjectId(getState());
  return await dispatch(deleteProjectRoleAct(projectId, roleId));
};
