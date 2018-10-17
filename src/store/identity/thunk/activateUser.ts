import { push } from 'react-router-redux';
import { Dispatch } from 'redux';

import { IState } from 'src/@types';
import { identifier, projectIdSearchParam } from 'src/store/router';
import { getAuthActivate, IGetAuthActivateData } from '../actions';

export const activateUser = () => async (dispatch: Dispatch, getState: () => IState) => {
  try {
    const state = getState();
    const bearerKey = identifier(state);
    if (!bearerKey) {
      throw new Error('BearerKey not found');
    }
    const activateParams: IGetAuthActivateData = {
      oneTimeToken: bearerKey,
    };
    const projectId = projectIdSearchParam(state);
    if (projectId) {
      activateParams.project = projectId;
    }
    return await dispatch(getAuthActivate(activateParams));
  } catch (e) {
    dispatch(push('/'));
    return e;
  }
};
