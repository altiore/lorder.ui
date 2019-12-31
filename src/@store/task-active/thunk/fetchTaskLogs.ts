import { routeProjectId, routeTaskSequenceNumber } from '@store/router';

import { fetchTaskLogsAction } from '../actions';

export const fetchTaskLogs = () => async (dispatch, getState) => {
  const state = getState();
  const projectId = routeProjectId(state);
  const sequenceNumber = routeTaskSequenceNumber(state);
  if (!projectId || !sequenceNumber) {
    return;
  }

  await dispatch(
    fetchTaskLogsAction({
      projectId,
      sequenceNumber,
    })
  );
};
