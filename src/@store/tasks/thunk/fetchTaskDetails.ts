import { fetchTaskDetailsA } from '../actions';
import { isCurrentTaskDetailsLoaded } from '../selectors';

export const fetchTaskDetails = taskId => (dispatch, getState) => {
  if (!isCurrentTaskDetailsLoaded(getState())) {
    dispatch(fetchTaskDetailsA(taskId));
  }
};
