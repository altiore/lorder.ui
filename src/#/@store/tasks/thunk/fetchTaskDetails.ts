import { clearTaskLogs } from '#/@store/task-active';

import { fetchTaskDetailsA } from '../actions';
import { isCurrentTaskDetailsLoaded } from '../selectors';

const current = {
  projectId: null,
  sequenceNumber: null,
};

export const fetchTaskDetails = ({ projectId, sequenceNumber }) => (dispatch, getState) => {
  if (current.projectId !== projectId || current.sequenceNumber !== sequenceNumber) {
    dispatch(clearTaskLogs());
  }
  current.projectId = projectId;
  current.sequenceNumber = sequenceNumber;
  if (!isCurrentTaskDetailsLoaded(getState())) {
    dispatch(fetchTaskDetailsA({ projectId, sequenceNumber }));
  }
};
