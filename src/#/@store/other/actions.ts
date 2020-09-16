import { createApiAction } from 'redux-actions-api';

export const resetGlobalCache = createApiAction('OTHER/RESET_GLOBAL_CACHE', () => ({
  request: {
    url: '/cache/reset',
  },
}));
