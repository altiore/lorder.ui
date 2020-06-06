import { routeProjectId } from '#/@store/router';

import { fetchProjectTasks } from './fetchProjectTasks';

export const refreshProjectTasks = () => async (dispatch, getState) => {
  const projectId = routeProjectId(getState());

  await dispatch(fetchProjectTasks(projectId, undefined, true));
};
