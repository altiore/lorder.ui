import { createApiAction } from 'redux-actions-api';

export const fetchStatistics = createApiAction('STATISTICS/FETCH', () => ({
  noAuth: true,
  request: {
    url: '/statistics',
  },
}));
