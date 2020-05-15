import toString from 'lodash/toString';
import { Dispatch } from 'redux';

import { fetchAllParticipantProjects } from '#/@store/projects';
import { identifier } from '#/@store/router';
import { getUserWorks } from '#/@store/user-works';

import { IIdentityState } from '../Identity';
import { baseIdentityState, userIsLoading, userRole } from '../selectors';

import * as Sentry from '@sentry/browser';
import { IState, ROLE } from '@types';

export const loadInitialData = () => async (dispatch: Dispatch<any>, getState: () => IState) => {
  const state = getState();
  const role = userRole(state);
  const isLoading = userIsLoading(state);
  const isStartRout = identifier(state);
  if (role !== ROLE.GUEST && !isLoading && !isStartRout) {
    await dispatch(fetchAllParticipantProjects());
    await dispatch(getUserWorks({}));
    const user: IIdentityState = baseIdentityState(getState());
    if (user) {
      Sentry.configureScope(function(scope) {
        scope.setUser({
          email: user.email,
          id: toString(user.id),
          username: user.displayName,
        });
        scope.setTag('defaultProjectId', toString(user.defaultProjectId));
        scope.setTag('role', toString(user.role));
      });
    }
  }
  return;
};
