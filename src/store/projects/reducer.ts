import { AxiosResponse } from 'axios';
import get from 'lodash-es/get';
import { Action, handleActions } from 'redux-actions';

import { DownloadList } from '../@common/entities';
import { addTaskTypesToProject, TaskType } from '../task-types';
import { getAllProjects, postProject } from './actions';
import { Project } from './Project';

type S = DownloadList<Project>;
type P = AxiosResponse;

const getAllProjectsHandler = (state: S): S => {
  return new DownloadList({
    ...state,
    isLoading: true,
  });
};

const getAllProjectsSuccessHandler = (state: S, { payload }: Action<AxiosResponse>): S => {
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

const postProjectSuccessHandler = (state: DownloadList, { payload }: Action<AxiosResponse>) => {
  return new DownloadList({
    ...state,
    list: payload ? [...state.list, new Project(payload.data)] : state.list,
  });
};

const addTaskTypesToProjectHandler = (state: DownloadList, { payload }: any) => {
  const index = state.list.findIndex(el => get(payload, 'projectId') === el.id);
  return new DownloadList({
    ...state,
    list: [
      ...state.list.slice(0, index),
      {
        ...state.list[index],
        projectTaskTypes: [
          ...state.list[index].projectTaskTypes,
          ...get(payload, 'taskTypes', []).map((id: number) => new TaskType({ id })),
        ],
      },
      ...state.list.slice(index + 1),
    ],
  });
};

export const projects = handleActions<S, P>(
  {
    [postProject.success]: postProjectSuccessHandler,
    [getAllProjects.toString()]: getAllProjectsHandler,
    [getAllProjects.success]: getAllProjectsSuccessHandler,
    [getAllProjects.fail]: getAllProjectsFailHandler,
    [addTaskTypesToProject.toString()]: addTaskTypesToProjectHandler,
  },
  new DownloadList()
);
