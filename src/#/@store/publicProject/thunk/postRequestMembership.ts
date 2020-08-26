import { push } from 'connected-react-router';
import { initialize } from 'redux-form';

import { isAuth, LOGIN_FORM_NAME } from '#/@store/identity';
import { ROUTE } from '#/@store/router';

import { postRequestMembershipAction } from '../actions';

export const postRequestMembership = data => async (dispatch, getState) => {
  if (isAuth(getState())) {
    dispatch(postRequestMembershipAction(data.projectId, data.role));
  } else {
    dispatch(push(ROUTE.AUTH.REGISTER));
    setTimeout(() => {
      dispatch(initialize(LOGIN_FORM_NAME, { email: data.email }));
    }, 200);
  }
};
