import { routeProjectId } from '#/@store/router';

import { fetchProjectPartsAct } from '../actions';

export const fetchProjectParts = (pId?: number) => async (dispatch, getState) => {
  const projectId = pId || routeProjectId(getState());
  return await dispatch(fetchProjectPartsAct(projectId));
};
