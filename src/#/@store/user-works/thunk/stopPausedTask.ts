import { currentProjectId, currentTaskId } from '#/@store/timer';

import { IUserWorkData } from '../actions';
import { startUserWork, stopUserWork } from './actionUserWork';

export const stopPausedTask = () => async (dispatch, getState) => {
  const state = getState();
  const taskId = currentTaskId(state);
  const projectId = currentProjectId(state);
  const data: IUserWorkData = {
    projectId: projectId as number,
    taskId,
  };
  await startUserWork(data)(dispatch, getState);

  await stopUserWork()(dispatch, getState);
};
