import { routeProjectId } from '#/@store/router';

import { createTaskStatusMove } from '../actions';

import { IStatusMove } from '@types';

export const createProjectStatusMove = (data: Partial<IStatusMove>) => async (dispatch, getState) => {
  const projectId = routeProjectId(getState());
  if (!projectId) {
    throw new Error('projectId is not found');
  }
  return await dispatch(createTaskStatusMove(projectId, data));
};
