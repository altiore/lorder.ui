import { Dispatch } from 'redux';

import { IState } from 'src/@types';
import { userId } from 'src/store/identity';
import { postFeedbackReq } from '../actions';

export const postFeedback = (values: any) => async (dispatch: Dispatch, getState: () => IState) => {
  const state = getState();

  return await dispatch(
    postFeedbackReq({
      userId: userId(state),
      ...values,
    })
  );
};
