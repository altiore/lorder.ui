import { fetchTaskDetailsA } from '../actions';
import { isCurrentTaskDetailsLoaded } from '../selectors';

export const fetchTaskDetails = ({ projectId, sequenceNumber }) => (dispatch, getState) => {
  if (!isCurrentTaskDetailsLoaded(getState())) {
    dispatch(fetchTaskDetailsA({ projectId, sequenceNumber }));
  }
};
