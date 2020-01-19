import { requestActions } from '@store/@common/requestActions';

export const fetchAltiore = requestActions('PUBLICK_ALTIORE/FETCH', () => ({
  request: {
    url: `/public/${process.env.REACT_APP_MAIN_PUBLIC_PROJECT}`,
  },
}));
