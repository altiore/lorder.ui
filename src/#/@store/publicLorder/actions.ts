import { requestActions } from '#/@store/@common/requestActions';

export const fetchLorder = requestActions('PUBLICK_LORDER/FETCH', () => ({
  request: {
    url: `/public/${process.env.REACT_APP_MAIN_PUBLIC_PROJECT}`,
  },
}));
