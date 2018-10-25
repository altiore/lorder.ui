import { requestActions } from 'src/store/@common/requestActions';

export const getAllTasks = requestActions(
  'TASKS/GET_ALL',
  (): any => ({
    request: {
      url: '/tasks',
    },
  })
);
