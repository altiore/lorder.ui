import { getTaskById } from '#/@store/tasks';
import { currentProjectId, currentTaskId } from '#/@store/timer';

import { IUserWorkData } from '../actions';
import { startUserWork, stopUserWork } from './actionUserWork';

export const stopPausedTask = () => async (dispatch, getState) => {
  const state = getState();
  const taskId = currentTaskId(state);
  const task = getTaskById(state)(taskId);
  const projectId = currentProjectId(state);
  if (projectId && task) {
    const data: IUserWorkData = {
      projectId: projectId as number,
      sequenceNumber: task.sequenceNumber,
    };
    await startUserWork(data)(dispatch, getState);

    await stopUserWork()(dispatch, getState);
  }
};
