import { requestActions } from 'src/store/@common/requestActions';

export const getUserWorks = requestActions(
  'USER_WORK/GET_MANY',
  (): any => ({
    request: {
      url: '/user-works/last',
    },
  })
);
