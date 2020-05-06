import { fetchProjectRoles } from '#/@store/project';
import { routeProjectId } from '#/@store/router';
import { fetchTaskStatuses } from '#/@store/task-statuses';

import { fetchTaskStatusMoves } from '../actions';

export const fetchProjectStatusMoves = () => async (dispatch, getState) => {
  const projectId = routeProjectId(getState());
  if (!projectId) {
    throw new Error('projectId is not found');
  }
  await dispatch(fetchTaskStatuses());
  await fetchProjectRoles()(dispatch, getState);
  return await dispatch(fetchTaskStatusMoves(projectId));
};
