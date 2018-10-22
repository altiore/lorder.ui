import Timer = NodeJS.Timer;
import get from 'lodash-es/get';
import { Dispatch } from 'react-redux';

import { IState } from 'src/@types';
import { changeIco } from 'src/store/@common/helpers';
import { getProjectById, Project } from 'src/store/projects';
import { setCurrentUserWorkId, tickUserWorkTimer } from 'src/store/timer';
import { IUserWorkData, IUserWorkDelete, patchAndStopUserWork, postAndStartUserWork } from '../actions';
import { UserWork } from '../UserWork';

export let timer: Timer;

export const startTimer = (userTask: Partial<UserWork>) => async (dispatch: Dispatch, getState: any) => {
  clearInterval(timer);
  if (!userTask.durationInSeconds) {
    userTask = new UserWork(userTask);
  }
  let project: Project;
  if (typeof userTask.projectId === 'number') {
    project = getProjectById(getState())(userTask.projectId);
  }
  timer = setInterval(() => dispatch(tickUserWorkTimer({ userTask, project })), 1000);
  dispatch(
    setCurrentUserWorkId({
      taskId: userTask.id,
      time: userTask.durationInSeconds,
      timer,
    })
  );
  changeIco('/stop.ico');
};

export const startUserWork = (data: IUserWorkData) => async (dispatch: Dispatch, getState: () => IState) => {
  const preparedData = { ...data };
  if (!preparedData.title) {
    const project: Project = getProjectById(getState())(preparedData.projectId);
    preparedData.title = `Задача для проекта ${project.title}`;
  }
  const res = await dispatch(postAndStartUserWork(preparedData));
  const userTaskData = get(res, 'payload.data');

  const userTask = new UserWork(userTaskData);

  return await dispatch(startTimer(userTask) as any);
};

export const stopUserWork = (data: IUserWorkDelete) => async (dispatch: Dispatch) => {
  clearInterval(timer);
  dispatch(
    setCurrentUserWorkId({
      taskId: undefined,
      timer: undefined,
    })
  );
  changeIco();
  document.title = 'Старт';
  return await dispatch(patchAndStopUserWork(data));
};
