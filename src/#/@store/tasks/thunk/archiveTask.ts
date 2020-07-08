import get from 'lodash/get';

import { archiveTaskA } from '../actions';
import { currentTaskDetails } from '../selectors';

export const archiveTask = ({ projectId, sequenceNumber }) => async (dispatch, getState) => {
  const taskId = get(currentTaskDetails(getState()), 'id') as number;

  try {
    if (taskId) {
      await dispatch(archiveTaskA({ projectId, sequenceNumber, taskId }));
    } else {
      throw new Error('Не удалось найти подробную информацию о данной задаче');
    }
  } catch (e) {
    if (process.env.NODE_ENV) {
      console.error(e);
    }
  }
};
