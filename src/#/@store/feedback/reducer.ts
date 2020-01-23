import { AxiosResponse } from 'axios';
import { Action, handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';

import { IMeta } from '@types';
import { DownloadList } from '../@common/entities';
import { fetchFeedbackList } from './actions';
import { Feedback } from './Feedback';

type S = DownloadList<Feedback>;
type P = AxiosResponse<any>;
type M = IMeta<any>;

const fetchFeedbackListHandler = (state: S): S => {
  return new DownloadList(Feedback, {
    ...state,
    isLoading: true,
  });
};

const fetchFeedbackListSuccessHandler = (state: S, { payload }: Action<AxiosResponse>): S => {
  return new DownloadList(Feedback, {
    ...state,
    isLoaded: true,
    isLoading: false,
    list: payload && payload.data && payload.data.map((el: any) => new Feedback(el)),
  });
};

const fetchFeedbackListFailHandler = (state: S): S => {
  return new DownloadList(Feedback);
};

const logOutHandler = () => {
  return new DownloadList(Feedback);
};

export const feedback = handleActions<S, P, M>(
  {
    [fetchFeedbackList.toString()]: fetchFeedbackListHandler,
    [fetchFeedbackList.success]: fetchFeedbackListSuccessHandler,
    [fetchFeedbackList.fail]: fetchFeedbackListFailHandler,

    [PURGE]: logOutHandler,
  },
  new DownloadList(Feedback)
);
