import { AxiosResponse } from 'axios';
import { Action, handleActions } from 'redux-actions';

import { DownloadList } from '../@common/entities';
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

// const postProjectHandler = (state: DownloadList, { payload }: any) => {
//   return new Project({
//     ...state,
//     ...payload,
//   });
// };

const postProjectSuccessHandler = (state: DownloadList, { payload }: Action<AxiosResponse>) => {
  console.log('postProjectSuccessHandler', payload);
  return new DownloadList({
    ...state,
    list: payload ? [...state.list, new Project(payload.data)] : state.list,
  });
};

// const postProjectFailHandler = (state: DownloadList, { error }: any) => {
//   console.log('postProjectFailHandler', error);
//   return new Project({
//     ...state,
//   })
// };

export const projects = handleActions<S, P>(
  {
    // [postProject.toString()]: postProjectHandler,
    [postProject.success]: postProjectSuccessHandler,
    // [postProject.fail]: postProjectFailHandler,
    [getAllProjects.toString()]: getAllProjectsHandler,
    [getAllProjects.success]: getAllProjectsSuccessHandler,
    [getAllProjects.fail]: getAllProjectsFailHandler,
  },
  new DownloadList()
);
