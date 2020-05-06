import { userId } from '#/@store/identity';

import { Dispatch } from 'redux';

import { postFeedbackReq } from '../actions';

import { IState } from '@types';

export const postFeedback = (values: any) => async (dispatch: Dispatch<any>, getState: () => IState) => {
  const state = getState();

  return await dispatch(
    postFeedbackReq({
      userId: userId(state),
      ...values,
    })
  );
};
