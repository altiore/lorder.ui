import { Dispatch } from 'redux';

import { IState, ROLE } from '@types';
import { getOwnProjects } from 'store/projects';
import { identifier } from 'store/router';
import { getUserWorks } from 'store/user-works';
import { userIsLoading, userRole } from '../selectors';

export const loadInitialData = () => async (dispatch: Dispatch, getState: () => IState) => {
  const state = getState();
  const role = userRole(state);
  const isLoading = userIsLoading(state);
  const isStartRout = identifier(state);
  if (role !== ROLE.GUEST && !isLoading && !isStartRout) {
    await dispatch(getOwnProjects({}));
    await dispatch(getUserWorks({}));
  }
  return;
};
