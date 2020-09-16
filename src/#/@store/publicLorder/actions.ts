import { createApiAction } from 'redux-actions-api';

export const fetchLorder = createApiAction('PUBLICK_LORDER/FETCH', () => ({
  noAuth: true,
  request: {
    url: `/public/${process.env.REACT_APP_MAIN_PUBLIC_PROJECT}`,
  },
}));
