import { routeProjectId } from '#/@store/router';

import { clearAllProjectTask } from '../actions';
import { fetchProjectTasks } from './fetchProjectTasks';

export const refreshProjectTasks = () => async (dispatch, getState) => {
  const projectId = routeProjectId(getState());

  dispatch(clearAllProjectTask());

  await dispatch(fetchProjectTasks(projectId));
};
