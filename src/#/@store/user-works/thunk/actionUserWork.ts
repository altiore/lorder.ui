import get from 'lodash/get';
import moment from 'moment';
import { change, getFormValues, initialize, isDirty, stopAsyncValidation } from 'redux-form';

import { parseFormErrorsFromResponse } from '#/@store/@common/helpers';
import { isFormMount } from '#/@store/form';
import { userId } from '#/@store/identity';
import { selectProject } from '#/@store/project';
import { fetchProjectDetails, getProjectById, Project, projectMembers } from '#/@store/projects';
import {
  EDIT_TASK_FORM,
  getTaskById,
  getTaskBySequenceNumber,
  getTaskInitialsFromTask,
  ITaskFormData,
  submitEditTaskForm,
} from '#/@store/tasks';
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
  try {
    const preparedData = { ...data };

    const startedTask = getTaskBySequenceNumber(getState())(preparedData.sequenceNumber, preparedData.projectId);
    const project: Project = getProjectById(getState())(preparedData.projectId);

    if (startedTask && startedTask.projectId !== preparedData.projectId) {
      throw new Error('Проект задачи для старта указан неверно!');
    }

    if (!preparedData.description) {
      preparedData.description = `Работа над "${project.title}" ` + moment().format('DD-MM-YYYY');
    }

    dispatch(selectProject(preparedData.projectId));
    dispatch(change(CREATE_USER_WORK_FORM_NAME, 'projectId', preparedData.projectId));

    const res = await dispatch(postAndStartUserWork(project, preparedData));

    const userWork = new UserWork(res?.payload?.data?.started || {});

    return await dispatch(startTimer(userWork, project) as any);
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.log(e);
    }
  }
};

export const stopUserWork = () => async (dispatch: any, getState: any) => {
  try {
    const state = getState();
    const isFormOnThePage = isFormMount(EDIT_TASK_FORM)(state);
    const isUnsavedChanges = isDirty(EDIT_TASK_FORM)(state);
    const formValues: ITaskFormData = getFormValues(EDIT_TASK_FORM)(state) as ITaskFormData;
    if (isFormOnThePage && isUnsavedChanges) {
      await dispatch(submitEditTaskForm(formValues));
    }

    const userWorkDelete: IUserWorkDelete = currentUserWorkData(getState());
    const res = await dispatch(patchAndStopUserWork(userWorkDelete));
    const newTaskData = getTaskInitialsFromTask(
      {
        ...(res?.payload?.data?.previous?.task || {}),
        projectParts: formValues.projectParts,
      },
      userId(getState())
    );
    dispatch(initialize(EDIT_TASK_FORM, newTaskData));
  } catch (e) {
    const status = e?.error?.response?.status;
    if (status === 422) {
      dispatch(stopAsyncValidation(EDIT_TASK_FORM, parseFormErrorsFromResponse(e)));
    }
  }
};

export const pauseWork = () => async (dispatch: any, getState: any) => {
  const data: IUserWorkDelete = currentUserWorkData(getState());
  return await dispatch(pauseUserWork(data));
};
