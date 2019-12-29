import { routeProjectId } from '@store/router';

import { updateProjectMemberAccessLevel } from '../actions';

export const updateMemberLevel = (accessLevel, memberId) => async (dispatch, getState) => {
  const projectId = routeProjectId(getState());

  if (!projectId || !memberId) {
    throw new Error('projectId and meberId are required!!!');
  }
  await dispatch(
    updateProjectMemberAccessLevel({
      accessLevel,
      memberId,
      projectId,
    })
  );
};
