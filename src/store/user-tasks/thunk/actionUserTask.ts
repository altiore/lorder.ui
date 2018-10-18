import Timer = NodeJS.Timer;
import get from 'lodash-es/get';
import { Dispatch } from 'react-redux';

import { changeIco } from 'src/store/@common/helpers';
import { setCurrentUserTaskId, tickUserTaskTimer } from 'src/store/timer';
import { IUserTaskData, IUserTaskDelete, patchAndStopUserTask, postAndStartUserTask } from '../actions';
import { UserTask } from '../UserTask';

export let timer: Timer;

export const startTimer = (userTask: Partial<UserTask>) => async (dispatch: Dispatch) => {
  clearInterval(timer);
  if (!userTask.durationInSeconds) {
    userTask = new UserTask(userTask);
  }
  timer = setInterval(() => dispatch(tickUserTaskTimer(userTask)), 1000);
  dispatch(
    setCurrentUserTaskId({
      taskId: userTask.id,
      time: userTask.durationInSeconds,
      timer,
    })
  );
  changeIco('/stop.ico');
};

export const startUserTask = (data: IUserTaskData) => async (dispatch: Dispatch) => {
  if (!data.title) {
    data.title = `Задача для проекта ${data.projectId}`;
  }
  const res = await dispatch(postAndStartUserTask(data));
  const userTaskData = get(res, 'payload.data');

  const userTask = new UserTask(userTaskData);

  return await dispatch(startTimer(userTask) as any);
};

export const stopUserTask = (data: IUserTaskDelete) => async (dispatch: Dispatch) => {
  clearInterval(timer);
  dispatch(
    setCurrentUserTaskId({
      taskId: undefined,
      timer: undefined,
    })
  );
  changeIco();
  document.title = 'Старт';
  return await dispatch(patchAndStopUserTask(data));
};
