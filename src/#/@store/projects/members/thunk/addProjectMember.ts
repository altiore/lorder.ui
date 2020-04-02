import { routeProjectId } from '#/@store/router';

import { postProjectMember } from '../actions';

export const addProjectMember = ({ email }) => async (dispatch, getState) => {
  const projectId = routeProjectId(getState());

  if (!projectId) {
    throw new Error('projectId is required!!!');
  }
  await dispatch(
    postProjectMember({
      email,
      projectId,
    })
  );
};
