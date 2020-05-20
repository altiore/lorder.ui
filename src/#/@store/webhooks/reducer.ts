import { Action, handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';

import { DownloadList } from '#/@store/@common/entities';

import { AxiosResponse } from 'axios';

import { getAllWebHooks } from './actions';
import { WebHook } from './web-hook';

type S = DownloadList<WebHook>;
type P = AxiosResponse;

const getAllWebHooksHandler = (state: S): S => {
  return state.startLoading();
};

const getAllWebHooksSuccessHandler = (state: S, { payload }: Action<AxiosResponse>): S => {
  return state.finishLoading(payload);
};

const getAllWebHooksFailHandler = (state: S): S => {
  return state.stopLoading();
};

const logOutHandler = () => {
  return new DownloadList(WebHook);
};

export const webHooks: any = handleActions<S, P>(
  {
    [getAllWebHooks.toString()]: getAllWebHooksHandler,
    [getAllWebHooks.success]: getAllWebHooksSuccessHandler,
    [getAllWebHooks.fail]: getAllWebHooksFailHandler,

    [PURGE]: logOutHandler,
  },
  new DownloadList(WebHook)
);
