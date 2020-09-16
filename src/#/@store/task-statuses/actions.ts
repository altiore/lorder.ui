import { createApiAction } from 'redux-actions-api';

import { CREATE_TASK_STATUS_FORM } from './consts';
import { TaskStatus } from './TaskStatus';

export const fetchTaskStatuses = createApiAction('TASK_STATUSES/FETCH_ALL', () => ({
  request: {
    url: '/task-statuses',
  },
}));

export const createTaskStatus = createApiAction('TASK_STATUSES/CREATE_NEW', (data: Partial<TaskStatus>) => ({
  form: CREATE_TASK_STATUS_FORM,
  request: {
    data,
    method: 'POST',
    url: '/task-statuses',
  },
}));

export const deleteTaskStatus = createApiAction('TASK_STATUSES/DELETE', (id: number) => ({
  id,
  request: {
    method: 'DELETE',
    url: `/task-statuses/${id}`,
  },
}));

export const deleteManyTaskStatuses = createApiAction('TASK_STATUSES/DELETE_MANY', (ids: number[]) => ({
  ids,
  request: {
    data: {
      ids,
    },
    method: 'DELETE',
    url: '/task-statuses/bulk',
  },
}));
