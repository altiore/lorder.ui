import { requestActions } from '#/@store/@common/requestActions';

export const getAllWebHooks = requestActions('WEB_HOOKS/GET_ALL', () => ({
  request: {
    url: '/webhooks',
  },
}));
