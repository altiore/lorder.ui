import { routeProjectId } from '#/@store/router';

import { fetchProjectPartsAct } from '../actions';

export const fetchProjectParts = (projId?: number) => async (dispatch, getState) => {
  const projectId = projId || routeProjectId(getState());
  return await dispatch(fetchProjectPartsAct(projectId));
};
