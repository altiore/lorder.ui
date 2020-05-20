import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { WebHook } from './web-hook';

import { IDownloadList, IState } from '@types';

const baseState = (state: IState) => state.webHooks;

export const webHooksIsLoaded = createDeepEqualSelector(
  baseState,
  (state: IDownloadList<WebHook>): boolean => state.isLoaded
);

export const webHooksIsLoading = createDeepEqualSelector(
  baseState,
  (state: IDownloadList<WebHook>): boolean => state.isLoading
);

export const webHookList = createDeepEqualSelector(baseState, (state: IDownloadList<WebHook>): WebHook[] => state.list);
