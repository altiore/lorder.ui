import { Dispatch } from 'redux';

import { IState } from '@types';
import { userId } from '#/@store/identity';
import { postFeedbackReq } from '../actions';

export const postFeedback = (values: any) => async (dispatch: Dispatch<any>, getState: () => IState) => {
  const state = getState();

  return await dispatch(
    postFeedbackReq({
      userId: userId(state),
      ...values,
    })
  );
};
