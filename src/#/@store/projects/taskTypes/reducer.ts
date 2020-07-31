import { Action, handleActions } from 'redux-actions';

import { DownloadList } from '#/@store/@common/entities';

import { AxiosResponse } from 'axios';

import { addTaskTypeToProject, deleteTaskTypeFromProject, getAllProjectTaskTypes } from './actions';
import { ProjectTaskType } from './project-task-type';

type S = DownloadList<ProjectTaskType>;

const getAllProjectTaskTypesHandler = (state: S) => {
  return state.startLoading();
};

const getAllProjectTaskTypesSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  return state.finishLoading(payload, 'taskTypeId');
};

const getAllProjectTaskTypesFailHandler = (state: S) => {
  return state.stopLoading();
};

const postTaskTypeToProjectHandler = (state: S) => {
  return state.startLoading();
};

const postTaskTypeToProjectSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  return state.addItem((payload as any).data).stopLoading();
};

const postTaskTypeToProjectFailHandler = (state: S) => {
  return state.stopLoading();
};

const deleteTaskTypeFromProjectHandler = (state: S) => {
  return state.startLoading();
};

const deleteTaskTypeFromProjectSuccessHandler = (state: S, { meta }: any) => {
  const taskTypeIndex = state.list.findIndex(el => meta?.previousAction?.payload?.taskTypeId === el.taskTypeId);
  if (taskTypeIndex !== -1) {
    return state.stopLoading().removeItem(taskTypeIndex);
  }
  return state.stopLoading();
};

const deleteTaskTypeFromProjectFailHandler = (state: S) => {
  return state.stopLoading();
};

export const projectTaskTypes = handleActions<S, any, any>(
  {
    [getAllProjectTaskTypes.toString()]: getAllProjectTaskTypesHandler,
    [getAllProjectTaskTypes.success]: getAllProjectTaskTypesSuccessHandler,
    [getAllProjectTaskTypes.fail]: getAllProjectTaskTypesFailHandler,

    [addTaskTypeToProject.toString()]: postTaskTypeToProjectHandler,
    [addTaskTypeToProject.success]: postTaskTypeToProjectSuccessHandler,
    [addTaskTypeToProject.fail]: postTaskTypeToProjectFailHandler,

    [deleteTaskTypeFromProject.toString()]: deleteTaskTypeFromProjectHandler,
    [deleteTaskTypeFromProject.success]: deleteTaskTypeFromProjectSuccessHandler,
    [deleteTaskTypeFromProject.fail]: deleteTaskTypeFromProjectFailHandler,
  },
  new DownloadList(ProjectTaskType)
);
