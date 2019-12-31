import { createAction } from 'redux-actions';

import { requestActions } from '@store/@common/requestActions';

export const getAllTasks = requestActions('TASKS/GET_ALL', (): any => ({
  request: {
    url: '/tasks',
  },
}));

/**
 * TODO: should be moved to projects/tasks directory
 */
export const fetchTaskDetailsA = requestActions('TASKS/FETCH_DETAILS', ({ projectId, sequenceNumber }): any => ({
  request: {
    url: `/projects/${projectId}/tasks/${sequenceNumber}`,
  },
  sequenceNumber,
}));

export const archiveTaskA = requestActions(
  'TASKS/ARCHIVE',
  ({ taskId, projectId, sequenceNumber }: { taskId: number; sequenceNumber: number; projectId: number }): any => ({
    projectId,
    request: {
      method: 'PATCH',
      url: `/tasks/${taskId}/archive`,
    },
    sequenceNumber,
    taskId,
  })
);

export const replaceTasks = createAction('TASKS/REPLACE_BY_IDS');

export const updateTask = createAction('TASKS/UPDATE_FROM_SOCKET');
