import { createAction } from 'redux-actions';

import { requestActions } from '@store/@common/requestActions';

export const getAllTasks = requestActions('TASKS/GET_ALL', (): any => ({
  request: {
    url: '/tasks',
  },
}));

export const fetchTaskDetailsA = requestActions('TASKS/FETCH_DETAILS', (taskId: number): any => ({
  request: {
    url: `/tasks/${taskId}`,
  },
  taskId,
}));

export const archiveTask = requestActions(
  'TASKS/ARCHIVE',
  ({ taskId, projectId }: { taskId: number; projectId: number }): any => ({
    projectId,
    request: {
      method: 'PATCH',
      url: `/tasks/${taskId}/archive`,
    },
    taskId,
  })
);

export const replaceTasks = createAction('TASKS/REPLACE_BY_IDS');
