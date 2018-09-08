import { AxiosResponse } from 'axios';
import get from 'lodash-es/get';
import { Action, ActionMeta, handleActions } from 'redux-actions';

import { IMeta } from 'src/@types';
import { DownloadList } from '../@common/entities';
import { TaskType } from '../task-types';
import {
  addTaskTypeToProject,
  deleteTaskTypeFromProject,
  fetchProjectDetails,
  getAllProjects,
  postProject,
  removeProject,
} from './actions';
import { Project } from './Project';

type S = DownloadList<Project>;
type P = AxiosResponse;
type M = IMeta<{ projectId: number }>;

const getAllProjectsHandler = (state: S): S => {
  return new DownloadList({
    ...state,
    isLoading: true,
  });
};

const getAllProjectsSuccessHandler = (state: S, { payload }: Action<P>): S => {
  return new DownloadList({
    ...state,
    isLoaded: true,
    isLoading: false,
    list: payload && payload.data && payload.data.map((el: any) => new Project(el)),
  });
};

const getAllProjectsFailHandler = (state: S): S => {
  return new DownloadList();
};

const postProjectSuccessHandler = (state: DownloadList, { payload }: Action<P>) => {
  return new DownloadList({
    ...state,
    list: payload ? [...state.list, new Project(payload.data)] : state.list,
  });
};

const addTaskTypeToProjectHandler = (state: DownloadList, { payload }: Action<P>) => {
  const index = state.list.findIndex(el => get(payload, 'projectId') === el.id);
  return new DownloadList({
    ...state,
    list: [
      ...state.list.slice(0, index),
      {
        ...state.list[index],
        taskTypes: [...state.list[index].taskTypes, new TaskType({ id: get(payload, 'taskTypeId') })],
      },
      ...state.list.slice(index + 1),
    ],
  });
};

const removeProjectSuccessHandler = (state: S, { meta }: ActionMeta<P, M>) => {
  const index = state.list.findIndex(el => el.id === meta.previousAction.payload.projectId);
  return new DownloadList({
    ...state,
    list: [...state.list.slice(0, index), ...state.list.slice(index + 1)],
  });
};

const fetchProjectDetailsSuccessHandler = (state: S, { payload }: Action<P>) => {
  const data = get(payload, 'data');
  const index = state.list.findIndex(el => el.id === data.id);
  return new DownloadList({
    ...state,
    list: [
      ...state.list.slice(0, index),
      new Project({
        ...state.list[index],
        ...data,
      }),
      ...state.list.slice(index + 1),
    ],
  });
};

const deleteTaskTypeFromProjectHandler = (state: S, { payload }: Action<P>) => {
  const projectIndex = state.list.findIndex(el => get(payload, 'projectId') === el.id);
  const taskTypeIndex = state.list[projectIndex].taskTypes.findIndex(el => get(payload, 'taskTypeId') === el.id);
  return new DownloadList({
    ...state,
    list: [
      ...state.list.slice(0, projectIndex),
      new Project({
        ...state.list[projectIndex],
        taskTypes: [
          ...state.list[projectIndex].taskTypes.slice(0, taskTypeIndex),
          ...state.list[projectIndex].taskTypes.slice(taskTypeIndex + 1),
        ],
      }),
      ...state.list.slice(projectIndex + 1),
    ],
  });
};

export const projects = handleActions<S, P>(
  {
    [postProject.success]: postProjectSuccessHandler,
    [getAllProjects.toString()]: getAllProjectsHandler,
    [getAllProjects.success]: getAllProjectsSuccessHandler,
    [getAllProjects.fail]: getAllProjectsFailHandler,
    [addTaskTypeToProject.toString()]: addTaskTypeToProjectHandler,
    [removeProject.success]: removeProjectSuccessHandler,
    [fetchProjectDetails.success]: fetchProjectDetailsSuccessHandler,
    [deleteTaskTypeFromProject.toString()]: deleteTaskTypeFromProjectHandler,
  },
  new DownloadList()
);
