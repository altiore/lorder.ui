import { requestActions } from '../@common/requestActions';

import { TaskStatus } from './TaskStatus';
import { CREATE_TASK_STATUS_FORM } from './consts';

export const fetchTaskStatuses = requestActions('TASK_STATUSES/FETCH_ALL', () => ({
  request: {
    url: '/task-statuses',
  },
}));

export const createTaskStatus = requestActions('TASK_STATUSES/CREATE_NEW', (data: Partial<TaskStatus>) => ({
  request: {
    method: 'POST',
    url: '/task-statuses',
    data,
  },
  form: CREATE_TASK_STATUS_FORM,
}));

export const deleteTaskStatus = requestActions('TASK_STATUSES/DELETE', (id: number) => ({
  request: {
    method: 'DELETE',
    url: `/task-statuses/${id}`,
  },
  id,
}));

export const deleteManyTaskStatuses = requestActions('TASK_STATUSES/DELETE_MANY', (ids: number[]) => ({
  request: {
    method: 'DELETE',
    url: '/task-statuses/bulk',
    data: {
      ids,
    },
  },
  ids,
}));
