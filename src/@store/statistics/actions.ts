import { requestActions } from '@store/@common/requestActions';

export const fetchStatistics = requestActions('STATISTICS/FETCH', () => ({
  request: {
    url: '/statistics',
  },
}));
