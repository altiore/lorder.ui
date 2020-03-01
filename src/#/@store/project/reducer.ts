import { LOCATION_CHANGE } from 'connected-react-router';
import { Action, handleActions } from 'redux-actions';

import { ISelectedProject } from '@types';
import { createProjectRoleAct, deleteProjectRoleAct, fetchProjectRolesAct, selectProject } from './actions';
import { SelectedProject } from './SelectedProject';

type IS = ISelectedProject;
interface IChangePayload {
  pathname: string;
}
type Selected = number;
type P = IChangePayload | Selected;

const locationChangeHandler = (state: IS, { payload }: Action<IChangePayload>) => {
  if (!payload) {
    throw new Error('Project Reducer, locationChangeHandler Error: payload required');
  }
  const matches = payload && payload.pathname && payload.pathname.match(/^\/projects\/(\d+)/);
  if (matches && matches[1]) {
    console.log('selectedProject changed to', parseInt(matches[1], 0));
    return { ...state, selected: parseInt(matches[1], 0) };
  }
  return state;
};

const selectProjectHandler = (state: IS, { payload }: Action<Selected>) => {
  return { roles: [], selected: payload };
};

const fetchProjectRolesHandler = (state: IS, { payload }) => {
  return state;
};
const fetchProjectRolesSuccessHandler = (state: IS, { payload }) => {
  return {
    ...state,
    roles: payload.data,
  };
};
const fetchProjectRolesFailHandler = (state: IS, { payload }) => {
  return state;
};

const createProjectRoleHandler = (state: IS, { payload }) => {
  return state;
};
const createProjectRoleSuccessHandler = (state: IS, { payload }) => {
  return {
    ...state,
    roles: [...state.roles, payload.data],
  };
};
const createProjectRoleFailHandler = (state: IS, { payload }) => {
  return state;
};

const deleteProjectRoleHandler = (state: IS, { payload }) => {
  return state;
};
const deleteProjectRoleSuccessHandler = (state: IS, { payload }) => {
  return {
    ...state,
    roles: [...state.roles, payload.data],
  };
};
const deleteProjectRoleFailHandler = (state: IS, { payload }) => {
  return state;
};

export const project: any = handleActions<IS, any>(
  {
    [LOCATION_CHANGE]: locationChangeHandler,
    [selectProject.toString()]: selectProjectHandler,

    [fetchProjectRolesAct.toString()]: fetchProjectRolesHandler,
    [fetchProjectRolesAct.success]: fetchProjectRolesSuccessHandler,
    [fetchProjectRolesAct.fail]: fetchProjectRolesFailHandler,

    [createProjectRoleAct.toString()]: createProjectRoleHandler,
    [createProjectRoleAct.success]: createProjectRoleSuccessHandler,
    [createProjectRoleAct.fail]: createProjectRoleFailHandler,

    [deleteProjectRoleAct.toString()]: deleteProjectRoleHandler,
    [deleteProjectRoleAct.success]: deleteProjectRoleSuccessHandler,
    [deleteProjectRoleAct.fail]: deleteProjectRoleFailHandler,
  },
  new SelectedProject()
);
