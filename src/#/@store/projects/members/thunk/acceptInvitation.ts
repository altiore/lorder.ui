import { routeProjectId } from '#/@store/router';

import { acceptInvitationAct } from '../actions';

export const acceptInvitation = () => async (dispatch, getState) => {
  const projectId = routeProjectId(getState());

  if (!projectId) {
    throw new Error('projectId is required!!!');
  }

  await dispatch(acceptInvitationAct(projectId));
};
