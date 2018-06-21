import { handleActions } from 'redux-actions';

import { postProject } from './actions';
import { IProjectState, Project } from './Project';

const postProjectHandler = (state: IProjectState, { payload }: any) => {
  return new Project({
    ...state,
    ...payload,
  });
};

const postProjectSuccessHandler = (state: IProjectState, { payload }: any) => {
  console.log('postProjectSuccessHandler', payload);
  return new Project({
    ...state,
  })
};

const postProjectFailHandler = (state: IProjectState, { error }: any) => {
  console.log('postProjectFailHandler', error);
  return new Project({
    ...state,
  })
};

export const projects = handleActions(
  {
    [postProject.toString()]: postProjectHandler,
    [postProject.success]: postProjectSuccessHandler,
    [postProject.fail]: postProjectFailHandler,
  } as any,
  new Project()
);
