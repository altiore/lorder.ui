import Timer = NodeJS.Timer;
import get from 'lodash-es/get';
import { Dispatch } from 'react-redux';

import { setCurrentUserTaskId, tickUserTaskTimer } from 'src/store/timer';
import { IUserTaskData, IUserTaskDelete, patchAndStopUserTask, postAndStartUserTask } from '../actions';

export let timer: Timer;

export const startUserTask = (data: IUserTaskData) => async (dispatch: Dispatch) => {
  clearInterval(timer);
  if (!data.title) {
    data.title = `Задача для проекта ${data.projectId}`;
  }
  const res = await dispatch(postAndStartUserTask(data));
  const responseData = get(res, 'payload.data');
  timer = setInterval(() => dispatch(tickUserTaskTimer(responseData)), 1000);
  dispatch(
    setCurrentUserTaskId({
      taskId: responseData.id,
      timer,
    })
  );
  return res;
};

export const stopUserTask = (data: IUserTaskDelete) => async (dispatch: Dispatch) => {
  clearInterval(timer);
  dispatch(
    setCurrentUserTaskId({
      taskId: undefined,
      time: 0,
      timer: undefined,
    })
  );
  return await dispatch(patchAndStopUserTask(data));
};
