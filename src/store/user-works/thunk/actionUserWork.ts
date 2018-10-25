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

export const startTimer = (userWork: Partial<UserWork>) => async (dispatch: Dispatch, getState: any) => {
  clearInterval(timer);
  if (!userWork.durationInSeconds) {
    userWork = new UserWork(userWork);
  }
  let project: Project;
  if (typeof userWork.projectId === 'number') {
    project = getProjectById(getState())(userWork.projectId);
  }
  timer = setInterval(() => dispatch(tickUserWorkTimer({ userWork, project })), 1000);
  dispatch(
    setCurrentUserWorkId({
      taskId: userWork.id,
      time: userWork.durationInSeconds,
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
  const userWorkData = get(res, 'payload.data');

  const userWork = new UserWork(userWorkData);

  return await dispatch(startTimer(userWork) as any);
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
