import { routeProjectId } from '#/@store/router';

import { fetchProjectRolesAct } from '../actions';

export const fetchProjectRoles = () => async (dispatch, getState) => {
  const projectId = routeProjectId(getState());
  return await dispatch(fetchProjectRolesAct(projectId));
};
