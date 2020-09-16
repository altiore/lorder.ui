import { createApiAction } from 'redux-actions-api';

export const getAllWebHooks = createApiAction('WEB_HOOKS/GET_ALL', () => ({
  request: {
    url: '/webhooks',
  },
}));
