import { openedProject } from '#/@store/projects/selectors';

import { fetchProjectDetails } from '../actions';

import { ACCESS_LEVEL } from '@types';

export const fetchOneProject = () => async (dispatch, getState) => {
  const project = openedProject(getState());
  if (project && project.id && typeof project.accessLevel === 'number' && project.accessLevel > ACCESS_LEVEL.WHITE) {
    await dispatch(fetchProjectDetails(project.id));
  }
};
