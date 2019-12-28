import { routeProjectId, routeTaskId } from '@store/router';

import { fetchTaskLogsAction } from '../actions';

export const fetchTaskLogs = () => async (dispatch, getState) => {
  const state = getState();
  const projectId = routeProjectId(state);
  const taskId = routeTaskId(state);
  if (!projectId || !taskId) {
    return;
  }

  await dispatch(
    fetchTaskLogsAction({
      projectId,
      taskId,
    })
  );
};
