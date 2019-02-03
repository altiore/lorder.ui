import { AxiosResponse } from 'axios';
import { Action, handleActions } from 'redux-actions';

import { DownloadList } from 'src/store/@common/entities';
import { IRequestAction } from 'src/store/@common/requestActions';
import { TaskType } from 'src/store/task-types';
import { User } from 'src/store/users';
import { getAllProjectTaskTypes, postTaskTypeToProject } from './actions';

type S = DownloadList<TaskType>;
interface IProjectRequest extends IRequestAction<Partial<TaskType>> {
  taskId: number;
  projectId: number;
  users: User[];
}
type P = IProjectRequest | AxiosResponse;

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

export const projectTaskTypes = handleActions<S, P>(
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
