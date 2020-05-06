import { routeProjectId } from '#/@store/router';

import { deleteProjectMemberAct } from '../actions';

export const deleteProjectMember = memberId => async (dispatch, getState) => {
  const projectId = routeProjectId(getState());

  if (!projectId || !memberId) {
    throw new Error('projectId and meberId are required!!!');
  }
  await dispatch(
    deleteProjectMemberAct({
      memberId,
      projectId,
    })
  );
};
