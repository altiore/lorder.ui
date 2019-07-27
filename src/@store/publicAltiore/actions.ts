import { requestActions } from '@store/@common/requestActions';

export const fetchAltiore = requestActions('PUBLICK_ALTIORE/FETCH', () => ({
  request: {
    url: `/public/f2c6742e-2394-4982-8979-5f01c5ab2a50`,
  },
}));
