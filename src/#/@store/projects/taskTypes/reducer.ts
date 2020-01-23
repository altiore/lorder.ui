import { AxiosResponse } from 'axios';
import { Action, handleActions } from 'redux-actions';

import { DownloadList } from '#/@store/@common/entities';
import { TaskType } from '#/@store/task-types';
import { getAllProjectTaskTypes, postTaskTypeToProject } from './actions';

type S = DownloadList<TaskType>;

const getAllProjectTaskTypesHandler = (state: S) => {
  return state.startLoading();
};

const getAllProjectTaskTypesSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  return state.finishLoading(payload);
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

export const projectTaskTypes = handleActions<S, any, any>(
  {
    [getAllProjectTaskTypes.toString()]: getAllProjectTaskTypesHandler,
    [getAllProjectTaskTypes.success]: getAllProjectTaskTypesSuccessHandler,
    [getAllProjectTaskTypes.fail]: getAllProjectTaskTypesFailHandler,

    [postTaskTypeToProject.toString()]: postTaskTypeToProjectHandler,
    [postTaskTypeToProject.success]: postTaskTypeToProjectSuccessHandler,
    [postTaskTypeToProject.fail]: postTaskTypeToProjectFailHandler,
  },
  new DownloadList(TaskType)
);
