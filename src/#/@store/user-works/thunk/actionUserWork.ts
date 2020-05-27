import get from 'lodash/get';
import moment from 'moment';
import { change } from 'redux-form';

import { selectProject } from '#/@store/project';
import { fetchProjectDetails, getProjectById, Project, projectMembers } from '#/@store/projects';
import { getTaskById, getTaskBySequenceNumber } from '#/@store/tasks';
import { currentTimeToString, currentUserWorkData, setCurrentUserWorkId, tickUserWorkTimer } from '#/@store/timer';
import {
  CREATE_USER_WORK_FORM_NAME,
  IUserWorkData,
  IUserWorkDelete,
  patchAndStopUserWork,
  UserWork,
} from '#/@store/user-works';

import { pauseUserWork, postAndStartUserWork } from '../actions';

import { IProject, IState } from '@types';

export let timer: any;

export const startTimer = (userWork: Partial<UserWork>, projectProp?: IProject) => async (
  dispatch: any,
  getState: any
) => {
  clearInterval(timer);
  if (!userWork || !userWork.durationInSeconds) {
    userWork = new UserWork(userWork);
  }
  const taskId = userWork.prevTaskId || userWork.taskId;
  const startedTask = getTaskById(getState())(taskId);
  if (!startedTask) {
    throw new Error('Вы пытаетесь начать неизвестную задачу');
  }
  const project = projectProp || getProjectById(getState())(startedTask.projectId);
  const members = projectMembers(getState());
  if (!members || !members.length) {
    dispatch(fetchProjectDetails(startedTask.projectId));
  }
  timer = setInterval(() => {
    dispatch(tickUserWorkTimer());
    document.title = `${currentTimeToString(getState())} | #${get(startedTask, 'sequenceNumber')} ${get(
      startedTask,
      'title'
    )} (${get(project, 'title')})`;
  }, 1000);
  dispatch(
    setCurrentUserWorkId({
      projectId: startedTask.projectId,
      start: userWork.startAt,
      taskId,
      timer,
      userWorkId: userWork.id,
    })
  );
};

export const startUserWork = (data: IUserWorkData) => async (dispatch: any, getState: () => IState) => {
  const preparedData = { ...data };
  const startedTask = getTaskById(getState())(preparedData.taskId);
  // Если есть sequenceNumber, то его нужно поменять на taskId
  if (data.sequenceNumber) {
    preparedData.taskId = get(getTaskBySequenceNumber(getState())(data.sequenceNumber, data.projectId), 'id');
    if (!preparedData.taskId) {
      throw new Error('Задача имеет порядковый номер, но ее не удалось найти в списке задач');
    }
    delete preparedData.sequenceNumber;
  }
  if (!preparedData.projectId) {
    preparedData.projectId = get(startedTask, 'projectId') as number;
    if (!preparedData.projectId) {
      throw new Error('Неясно в каком проекте начинать новую задачу');
    }
  }
  if (startedTask && startedTask.projectId !== preparedData.projectId) {
    throw new Error('Проект начинаемой задачи указан неверно!');
  }
  const project: Project = getProjectById(getState())(preparedData.projectId);
  if (!preparedData.title) {
    if (preparedData.description) {
      preparedData.title = preparedData.description;
    } else {
      preparedData.title = `Работа над "${project.title}" ` + moment().format('DD-MM-YYYY');
    }
  }
  dispatch(selectProject(preparedData.projectId));
  dispatch(change(CREATE_USER_WORK_FORM_NAME, 'projectId', preparedData.projectId));
  const res = await dispatch(
    postAndStartUserWork({
      project,
      userWork: preparedData,
    })
  );

  const userWorkData = get(res, 'payload.data.started');
  const userWork = new UserWork(userWorkData);

  return await dispatch(startTimer(userWork, project) as any);
};

export const stopUserWork = () => async (dispatch: any, getState: any) => {
  const data: IUserWorkDelete = currentUserWorkData(getState());
  return await dispatch(patchAndStopUserWork(data));
};

export const pauseWork = () => async (dispatch: any, getState: any) => {
  const data: IUserWorkDelete = currentUserWorkData(getState());
  return await dispatch(pauseUserWork(data));
};
