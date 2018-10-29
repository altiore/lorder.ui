import Timer = NodeJS.Timer;
import get from 'lodash-es/get';
import * as moment from 'moment';
import { Dispatch } from 'react-redux';

import { IState } from 'src/@types';
import { changeIco } from 'src/store/@common/helpers';
import { getProjectById, Project } from 'src/store/projects';
import { setCurrentUserWorkId, tickUserWorkTimer } from 'src/store/timer';
import { IUserWorkData, IUserWorkDelete, patchAndStopUserWork, postAndStartUserWork } from '../actions';
import { UserWork } from '../UserWork';

export let timer: Timer;

export const startTimer = (userWork: Partial<UserWork>, project: Project) => async (dispatch: Dispatch) => {
  clearInterval(timer);
  if (!userWork.durationInSeconds) {
    userWork = new UserWork(userWork);
  }
  timer = setInterval(() => dispatch(tickUserWorkTimer({ userWork, project })), 1000);
  dispatch(
    setCurrentUserWorkId({
      projectId: project.id,
      taskId: userWork.taskId,
      time: userWork.durationInSeconds,
      timer,
      userWorkId: userWork.id,
    })
  );
  changeIco('/stop.ico');
};

export const startUserWork = (data: IUserWorkData) => async (dispatch: Dispatch, getState: () => IState) => {
  const preparedData = { ...data };
  const project: Project = getProjectById(getState())(preparedData.projectId);
  if (!preparedData.title) {
    if (preparedData.description) {
      preparedData.title = preparedData.description;
    } else {
      preparedData.title = `Задача для проекта ${project.title}`;
      preparedData.description = moment().format('YYYY-MM-DD');
    }
  }
  const res = await dispatch(
    postAndStartUserWork({
      project,
      userWork: preparedData,
    })
  );
  const userWorkData = get(res, 'payload.data');

  const userWork = new UserWork(userWorkData);

  return await dispatch(startTimer(userWork, project) as any);
};

export const stopUserWork = (data: IUserWorkDelete) => async (dispatch: Dispatch) => {
  clearInterval(timer);
  dispatch(
    setCurrentUserWorkId({
      projectId: undefined,
      taskId: undefined,
      timer: undefined,
      userWorkId: undefined,
    })
  );
  changeIco();
  document.title = 'Старт';
  return await dispatch(patchAndStopUserWork(data));
};
