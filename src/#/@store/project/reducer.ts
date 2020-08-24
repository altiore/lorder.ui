import { LOCATION_CHANGE } from 'connected-react-router';
import { Action, handleActions } from 'redux-actions';

import { nothing, removeFromList } from '#/@store/@reducers';

import {
  createProjectRoleAct,
  deleteProjectRoleAct,
  editProjectRoleAct,
  fetchProjectRolesAct,
  selectProject,
} from './actions';
import { SelectedProject } from './SelectedProject';

import { ISelectedProject } from '@types';

type IS = ISelectedProject;
interface IChangePayload {
  pathname: string;
}
type Selected = number;

const locationChangeHandler = (state: IS, { payload }: Action<IChangePayload>) => {
  if (!payload) {
    throw new Error('Project Reducer, locationChangeHandler Error: payload required');
  }
  const matches = payload && payload.pathname && payload.pathname.match(/^\/projects\/(\d+)/);
  if (matches && matches[1]) {
    return { ...state, selected: parseInt(matches[1], 0) };
  }
  return state;
};

const selectProjectHandler = (state: IS, { payload }: Action<Selected>) => {
  return { ...state, parts: [], roles: [], selected: payload };
};

const fetchProjectRolesSuccessHandler = (state: IS, { payload }) => {
  return {
    ...state,
    roles: payload.data,
  };
};

const createProjectRoleSuccessHandler = (state: IS, { payload }) => {
  return {
    ...state,
    roles: [...state.roles, payload.data],
  };
};

const editProjectRoleSuccessHandler = (state: IS, { payload }) => {
  const roleIndex = state.roles.findIndex(el => el.id === payload?.data?.id);
  return {
    ...state,
    roles: [
      ...state.roles.slice(0, roleIndex),
      {
        ...state.roles[roleIndex],
        ...payload.data,
      },
      ...state.roles.slice(roleIndex + 1),
    ],
  };
};

export const projectReducer: any = handleActions<IS, any, any>(
  {
    [LOCATION_CHANGE]: locationChangeHandler,
    [selectProject.toString()]: selectProjectHandler,

    [fetchProjectRolesAct.toString()]: nothing,
    [fetchProjectRolesAct.success]: fetchProjectRolesSuccessHandler,
    [fetchProjectRolesAct.fail]: nothing,

    [createProjectRoleAct.toString()]: nothing,
    [createProjectRoleAct.success]: createProjectRoleSuccessHandler,
    [createProjectRoleAct.fail]: nothing,

    [editProjectRoleAct.toString()]: nothing,
    [editProjectRoleAct.success]: editProjectRoleSuccessHandler,
    [editProjectRoleAct.fail]: nothing,

    [deleteProjectRoleAct.toString()]: nothing,
    [deleteProjectRoleAct.success]: removeFromList('roles'),
    [deleteProjectRoleAct.fail]: nothing,
  },
  new SelectedProject()
);
