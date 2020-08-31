import { Action, handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';

import { AxiosResponse } from 'axios';

import { DownloadList } from '../@common/entities';
import { fetchProjectsPubAct } from './actions';
import { ProjectPub } from './project-pub';

import { IMeta } from '@types';

type S = DownloadList<ProjectPub>;
type P = AxiosResponse;
type M = IMeta<ProjectPub>;

const fetchProjectsPubHandler = (state: S) => {
  return state.startLoading();
};

const fetchProjectsPubSuccessHandler = (state: S, { payload }: Action<P>) => {
  return state.replaceAll(payload, 'uuid');
};

const fetchProjectsPubFailHandler = (state: S) => {
  return state.finishLoading();
};

const logOutHandler = () => {
  return new DownloadList(ProjectPub);
};

export default handleActions<S, P, M>(
  {
    [fetchProjectsPubAct.toString()]: fetchProjectsPubHandler,
    [fetchProjectsPubAct.success]: fetchProjectsPubSuccessHandler,
    [fetchProjectsPubAct.fail]: fetchProjectsPubFailHandler,

    [PURGE]: logOutHandler,
  },
  new DownloadList(ProjectPub)
);
