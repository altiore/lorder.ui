import { requestActions } from '#/@store/@common/requestActions';

export const fetchStatistics = requestActions('STATISTICS/FETCH', () => ({
  noAuth: true,
  request: {
    url: '/statistics',
  },
}));
