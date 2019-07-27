import { handleActions } from 'redux-actions';

import { fetchStatistics } from './actions';
import { Statistics } from './Statistics';

const fetchStatisticsHandler = (state: Statistics) => {
  return state;
};

const fetchStatisticsSuccessHandler = (state: Statistics, { payload }) => {
  return new Statistics({
    ...state,
    ...payload.data,
  });
};

const fetchStatisticsFailHandler = (state: Statistics) => {
  return state;
};

export const statistics = handleActions(
  {
    [fetchStatistics.toString()]: fetchStatisticsHandler,
    [fetchStatistics.success.toString()]: fetchStatisticsSuccessHandler,
    [fetchStatistics.fail.toString()]: fetchStatisticsFailHandler,
  },
  new Statistics()
);
