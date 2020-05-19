import { LOCATION_CHANGE } from 'connected-react-router';
import get from 'lodash/get';
import { Action, handleActions } from 'redux-actions';

import { nothing, removeFromList } from '#/@store/@reducers';

import {
  createProjectPartAct,
  createProjectRoleAct,
  deleteProjectPartAct,
  deleteProjectRoleAct,
  fetchProjectPartsAct,
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
type P = IChangePayload | Selected;

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
  return { ...state, roles: [], selected: payload };
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

const fetchProjectPartsSuccessHandler = (state: IS, { payload }) => {
  return {
    ...state,
    parts: get(payload, ['data', 'data'], payload.data || []),
  };
};

const createProjectPartActSuccessHandler = (state: IS, { payload }) => {
  return {
    ...state,
    parts: [...state.parts, payload.data],
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

    [deleteProjectRoleAct.toString()]: nothing,
    [deleteProjectRoleAct.success]: removeFromList('roles'),
    [deleteProjectRoleAct.fail]: nothing,

    [fetchProjectPartsAct.toString()]: nothing,
    [fetchProjectPartsAct.success]: fetchProjectPartsSuccessHandler,
    [fetchProjectPartsAct.fail]: nothing,

    [createProjectPartAct.toString()]: nothing,
    [createProjectPartAct.success]: createProjectPartActSuccessHandler,
    [createProjectPartAct.fail]: nothing,

    [deleteProjectPartAct.toString()]: nothing,
    [deleteProjectPartAct.success]: removeFromList('parts'),
    [deleteProjectPartAct.fail]: nothing,
  },
  new SelectedProject()
);
