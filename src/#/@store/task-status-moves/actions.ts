import { requestActions } from '../@common/requestActions';

import { TaskStatusMove } from './TaskStatusMove';
import { CREATE_TASK_STATUS_MOVE_FORM } from './consts';

export const fetchTaskStatusMoves = requestActions('TASK_STATUS_MOVES/FETCH_ALL', () => ({
  request: {
    url: '/task-status-moves',
  },
}));

export const createTaskStatusMove = requestActions('TASK_STATUS_MOVES/CREATE_NEW', (data: Partial<TaskStatusMove>) => ({
  request: {
    method: 'POST',
    url: '/task-status-moves',
    data,
  },
  form: CREATE_TASK_STATUS_MOVE_FORM,
}));

export const deleteTaskStatusMove = requestActions('TASK_STATUS_MOVES/DELETE', (id: number) => ({
  request: {
    method: 'DELETE',
    url: `/task-status-moves/${id}`,
  },
  id,
}));

export const deleteManyTaskStatusMoves = requestActions('TASK_STATUS_MOVES/DELETE_MANY', (ids: number[]) => ({
  request: {
    method: 'DELETE',
    url: '/task-status-moves/bulk',
    data: {
      ids,
    },
  },
  ids,
}));
