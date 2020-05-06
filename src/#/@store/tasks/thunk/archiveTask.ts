import get from 'lodash/get';

import { archiveTaskA } from '../actions';
import { currentTaskDetails } from '../selectors';

export const archiveTask = ({ projectId, sequenceNumber }) => (dispatch, getState) => {
  const taskId = get(currentTaskDetails(getState()), 'id') as number;

  if (taskId) {
    dispatch(archiveTaskA({ projectId, sequenceNumber, taskId }));
  } else {
    throw new Error('Не удалось найти подробную информацию о данной задаче');
  }
};
