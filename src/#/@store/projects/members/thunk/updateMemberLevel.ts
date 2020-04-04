import { routeProjectId } from '#/@store/router';

import { updateProjectMemberAccessLevel } from '../actions';

export const updateMemberLevel = (memberId, data) => async (dispatch, getState) => {
  const projectId = routeProjectId(getState());

  if (!projectId || !memberId) {
    throw new Error('projectId and meberId are required!!!');
  }
  await dispatch(
    updateProjectMemberAccessLevel({
      data,
      memberId,
      projectId,
    })
  );
};
