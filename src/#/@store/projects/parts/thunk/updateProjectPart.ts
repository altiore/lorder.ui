import omit from 'lodash/omit';

import { routeProjectId } from '#/@store/router';

import { updateProjectPartAct } from '../actions';

import { IProjectPart } from '@types';

export const updateProjectPart = (data: Omit<IProjectPart, 'projectId' | 'tasks'>) => async (dispatch, getState) => {
  const projectId = routeProjectId(getState());
  if (!projectId) {
    throw new Error('projectId is not found');
  }
  return await dispatch(updateProjectPartAct(data.id, projectId, omit(data, ['id', 'projectId', 'tasks'])));
};
