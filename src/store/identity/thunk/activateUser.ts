import { push } from 'react-router-redux';
import { Dispatch } from 'redux';

import { IState } from 'src/@types';
import { identifier } from 'src/store/router';
import { getAuthActivate } from '../actions';

export const activateUser = () => async (dispatch: Dispatch, getState: () => IState) => {
  try {
    const bearerKey = identifier(getState());
    if (!bearerKey) {
      throw new Error('BearerKey not found');
    }
    return await dispatch(getAuthActivate(bearerKey));
  } catch (e) {
    dispatch(push('/'));
    return e;
  }
};
