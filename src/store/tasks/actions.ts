import { createAction } from 'redux-actions';

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

export const replaceTasks = createAction('TASKS/REPLACE_BY_IDS');
