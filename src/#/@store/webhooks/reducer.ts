import { Action, handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';

import { DownloadList } from '#/@store/@common/entities';

import { AxiosResponse } from 'axios';

import { getAllWebHooks } from './actions';
import { WebHook } from './web-hook';

type S = DownloadList<WebHook>;
type P = AxiosResponse;

const getAllWebHooksHandler = (state: S): S => {
  return state && state.startLoading ? state.startLoading() : new DownloadList(WebHook);
};

const getAllWebHooksSuccessHandler = (state: S, { payload }: Action<AxiosResponse>): S => {
  return state && state.finishLoading ? state.finishLoading(payload) : new DownloadList(WebHook);
};

const getAllWebHooksFailHandler = (state: S): S => {
  return state && state.stopLoading ? state.stopLoading() : new DownloadList(WebHook);
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
