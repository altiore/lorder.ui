import { Action, handleActions } from 'redux-actions';

import { AxiosResponse } from 'axios';

import { DownloadList } from '../@common/entities';
import { fetchProjectsStatisticAct } from './actions';
import { ProjectStatistic } from './project-statistic';

import { IMeta } from '@types';

type S = DownloadList<ProjectStatistic>;
type P = AxiosResponse;
type M = IMeta<ProjectStatistic>;

const fetchProjectsStatisticHandler = (state: S) => {
  return state.startLoading();
};

const fetchProjectsStatisticSuccessHandler = (state: S, { payload }: Action<P>) => {
  return state.replaceAll(payload, 'uuid');
};

const fetchProjectsStatisticFailHandler = (state: S) => {
  return state.finishLoading();
};

export default handleActions<S, P, M>(
  {
    [fetchProjectsStatisticAct.toString()]: fetchProjectsStatisticHandler,
    [fetchProjectsStatisticAct.success]: fetchProjectsStatisticSuccessHandler,
    [fetchProjectsStatisticAct.fail]: fetchProjectsStatisticFailHandler,
  },
  new DownloadList(ProjectStatistic)
);
