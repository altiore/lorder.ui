import { push } from 'react-router-redux';
import { Dispatch } from 'redux';

import { identifier } from 'src/store/router'
import { IState } from '../../rootReducer';
import { getAuthActivate } from '../actions'

export const activateUser = () => async (dispatch: Dispatch, getState: () => IState) => {
  try {
    const token = identifier(getState());
    if (!token) {
      throw new Error('Token not found');
    }
    return await dispatch(getAuthActivate(token));
  } catch (e) {
    dispatch(push('/'));
    return e;
  }
};