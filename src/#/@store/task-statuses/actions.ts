import { requestActions } from '../@common/requestActions';
import { CREATE_TASK_STATUS_FORM } from './consts';
import { TaskStatus } from './TaskStatus';

export const fetchTaskStatuses = requestActions('TASK_STATUSES/FETCH_ALL', () => ({
  request: {
    url: '/task-statuses',
  },
}));

export const createTaskStatus = requestActions('TASK_STATUSES/CREATE_NEW', (data: Partial<TaskStatus>) => ({
  form: CREATE_TASK_STATUS_FORM,
  request: {
    data,
    method: 'POST',
    url: '/task-statuses',
  },
}));

export const deleteTaskStatus = requestActions('TASK_STATUSES/DELETE', (id: number) => ({
  id,
  request: {
    method: 'DELETE',
    url: `/task-statuses/${id}`,
  },
}));

export const deleteManyTaskStatuses = requestActions('TASK_STATUSES/DELETE_MANY', (ids: number[]) => ({
  ids,
  request: {
    data: {
      ids,
    },
    method: 'DELETE',
    url: '/task-statuses/bulk',
  },
}));
