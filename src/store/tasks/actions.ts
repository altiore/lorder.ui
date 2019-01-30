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

export const fetchTaskDetails = requestActions(
  'TASKS/FETCH_DETAILS',
  (taskId: number): any => ({
    request: {
      url: `/tasks/${taskId}`,
    },
    taskId,
  })
);

export const archiveTask = requestActions(
  'TASKS/ARCHIVE',
  (taskId: number): any => ({
    request: {
      method: 'PATCH',
      url: `/tasks/${taskId}/archive`,
    },
    taskId,
  })
);

export const replaceTasks = createAction('TASKS/REPLACE_BY_IDS');
