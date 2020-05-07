import { clearTaskLogs } from '#/@store/task-active';

import { fetchTaskDetailsA } from '../actions';

const current = {
  projectId: null,
  sequenceNumber: null,
};

export const fetchTaskDetails = ({ projectId, sequenceNumber }) => async dispatch => {
  if (current.projectId !== projectId || current.sequenceNumber !== sequenceNumber) {
    dispatch(clearTaskLogs());
  }
  current.projectId = projectId;
  current.sequenceNumber = sequenceNumber;

  await dispatch(fetchTaskDetailsA({ projectId, sequenceNumber }));
};
