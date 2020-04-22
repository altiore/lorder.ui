import get from 'lodash/get';

import { selectProject } from '#/@store/project';
import { fetchProjectDetails, getProjectById, Project, projectMembers } from '#/@store/projects';
import { getTaskBySequenceNumber, replaceTasks } from '#/@store/tasks';
import { currentTimeToString, currentUserWorkData, setCurrentUserWorkId, tickUserWorkTimer } from '#/@store/timer';
import { CREATE_USER_WORK_FORM_NAME } from '#/@store/user-works';
import { IUserWorkData, IUserWorkDelete, patchAndStopUserWork, UserWork } from '#/@store/user-works';

import moment from 'moment';
import { change } from 'redux-form';

import { postAndStartUserWork } from '../actions';

import { IState } from '@types';

export let timer: any;

export const startTimer = (userWork: Partial<UserWork>, project: Project) => async (dispatch: any, getState: any) => {
  clearInterval(timer);
  if (!userWork.durationInSeconds) {
    userWork = new UserWork(userWork);
  }
  timer = setInterval(() => {
    dispatch(tickUserWorkTimer({ userWork, project }));
    document.title = `${currentTimeToString(getState())} | ${get(userWork, 'task.title')} (${get(project, 'title')})`;
  }, 1000);
  dispatch(
    setCurrentUserWorkId({
      projectId: project.id,
      taskId: userWork.taskId,
      time: userWork.durationInSeconds,
      timer,
      userWorkId: userWork.id,
    })
  );
  // changeIco('/stop.ico');
};

export const startUserWork = (data: IUserWorkData) => async (dispatch: any, getState: () => IState) => {
  const preparedData = { ...data };
  // Если есть sequenceNumber, то его нужно поменять на taskId
  if (data.sequenceNumber) {
    preparedData.taskId = get(getTaskBySequenceNumber(getState())(data.sequenceNumber, data.projectId), 'id');
    if (!preparedData.taskId) {
      throw new Error('Задача имеет порядковый номер, но ее не удалось найти в списке задач');
    }
    delete preparedData.sequenceNumber;
  }
  const project: Project = getProjectById(getState())(preparedData.projectId);
  if (!preparedData.title) {
    if (preparedData.description) {
      preparedData.title = preparedData.description;
    } else {
      preparedData.title = `Работа над "${project.title}" ` + moment().format('DD-MM-YYYY');
    }
  }
  const members = projectMembers(getState());
  if (!members || !members.length) {
    dispatch(fetchProjectDetails(data.projectId));
  }
  dispatch(selectProject(data.projectId));
  dispatch(change(CREATE_USER_WORK_FORM_NAME, 'projectId', data.projectId));
  const res = await dispatch(
    postAndStartUserWork({
      project,
      userWork: preparedData,
    })
  );
  const finishedTasks = get(res, 'payload.data.finished');
  if (finishedTasks && finishedTasks.length) {
    dispatch(replaceTasks(finishedTasks));
  }

  const userWorkData = get(res, 'payload.data.started');
  const userWork = new UserWork(userWorkData);

  return await dispatch(startTimer(userWork, project) as any);
};

export const stopUserWork = () => async (dispatch: any, getState: any) => {
  const data: IUserWorkDelete = currentUserWorkData(getState());
  clearInterval(timer);
  dispatch(
    setCurrentUserWorkId({
      projectId: undefined,
      taskId: undefined,
      timer: undefined,
      userWorkId: undefined,
    })
  );
  // changeIco();
  document.title = 'Старт';
  return await dispatch(patchAndStopUserWork(data));
};
