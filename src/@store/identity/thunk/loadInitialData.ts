import { Dispatch } from 'redux';

import { IState, ROLE } from '@types';
import { fetchAllParticipantProjects } from '@store/projects';
import { identifier } from '@store/router';
import { getUserWorks } from '@store/user-works';
import { userIsLoading, userRole } from '../selectors';

export const loadInitialData = () => async (dispatch: Dispatch<any>, getState: () => IState) => {
  const state = getState();
  const role = userRole(state);
  const isLoading = userIsLoading(state);
  const isStartRout = identifier(state);
  if (role !== ROLE.GUEST && !isLoading && !isStartRout) {
    await dispatch(fetchAllParticipantProjects());
    await dispatch(getUserWorks({}));
  }
  return;
};
