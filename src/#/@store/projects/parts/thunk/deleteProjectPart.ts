import { routeProjectId } from '#/@store/router';

import { deleteProjectPartAct } from '../actions';

export const deleteProjectPart = (partId: number) => async (dispatch, getState) => {
  const projectId = routeProjectId(getState());
  if (!projectId) {
    throw new Error('projectId is not found');
  }
  return await dispatch(deleteProjectPartAct(projectId, partId));
};
