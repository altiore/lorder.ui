import { requestActions } from 'src/store/@common/requestActions';

export const getAllTasks = requestActions(
  'TASKS/GET_ALL',
  (): any => ({
    request: {
      // params: {
      //   count: 100,
      //   skip: 0,
      // },
      url: '/tasks',
    },
  })
);
