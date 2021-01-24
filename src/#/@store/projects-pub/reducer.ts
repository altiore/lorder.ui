import { Action, handleActions } from 'redux-actions';

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

export default handleActions<S, P, M>(
  {
    [fetchProjectsPubAct.toString()]: fetchProjectsPubHandler,
    [fetchProjectsPubAct.success]: fetchProjectsPubSuccessHandler,
    [fetchProjectsPubAct.fail]: fetchProjectsPubFailHandler,
  },
  new DownloadList(ProjectPub)
);
