import { requestActions } from '@store/@common/requestActions';

export const resetGlobalCache = requestActions('OTHER/RESET_GLOBAL_CACHE', () => ({
  request: {
    url: '/cache/reset',
  },
}));
