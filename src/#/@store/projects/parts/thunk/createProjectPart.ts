import { routeProjectId } from '#/@store/router';

import { createProjectPartAct } from '../actions';

import { IProjectPart } from '@types';

export const createProjectPart = (data: Omit<IProjectPart, 'id' | 'projectId'>) => async (dispatch, getState) => {
  const projectId = routeProjectId(getState());
  if (!projectId) {
    throw new Error('projectId is not found');
  }
  return await dispatch(createProjectPartAct(projectId, data));
};
