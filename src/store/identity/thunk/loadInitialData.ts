import { Dispatch } from 'redux';

import { IState, ROLE } from 'src/@types';
import { getOwnProjects } from 'src/store/projects';
import { getUserWorks } from 'src/store/user-works';
import { userRole } from '../selectors';

export const loadInitialData = () => async (dispatch: Dispatch, getState: () => IState) => {
  const role = userRole(getState());
  if (role !== ROLE.GUEST) {
    await dispatch(getOwnProjects({}));
    await dispatch(getUserWorks({}));
  }
};
