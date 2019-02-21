import { AxiosResponse } from 'axios';
import { Action, handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';

import { IMeta } from 'src/@types';
import { DownloadList } from '../@common/entities';
import { fetchFeedbacks } from './actions';
import { Feedback } from './Feedback';

type S = DownloadList<Feedback>;
type P = AxiosResponse<any>;
type M = IMeta<any>;

const fetchFeedbacksHandler = (state: S): S => {
  return new DownloadList(Feedback, {
    ...state,
    isLoading: true,
  });
};

const fetchFeedbacksSuccessHandler = (state: S, { payload }: Action<AxiosResponse>): S => {
  return new DownloadList(Feedback, {
    ...state,
    isLoaded: true,
    isLoading: false,
    list: payload && payload.data && payload.data.map((el: any) => new Feedback(el)),
  });
};

const fetchFeedbacksFailHandler = (state: S): S => {
  return new DownloadList(Feedback);
};

const logOutHandler = () => {
  return new DownloadList(Feedback);
};

export const feedbacks = handleActions<S, P, M>(
  {
    [fetchFeedbacks.toString()]: fetchFeedbacksHandler,
    [fetchFeedbacks.success]: fetchFeedbacksSuccessHandler,
    [fetchFeedbacks.fail]: fetchFeedbacksFailHandler,

    [PURGE]: logOutHandler,
  },
  new DownloadList(Feedback)
);
