import { requestActions } from '../@common/requestActions';
import { CREATE_TASK_STATUS_MOVE_FORM } from './consts';
import { TaskStatusMove } from './TaskStatusMove';

export const fetchTaskStatusMoves = requestActions('TASK_STATUS_MOVES/FETCH_ALL', () => ({
  request: {
    url: '/task-status-moves',
  },
}));

export const createTaskStatusMove = requestActions('TASK_STATUS_MOVES/CREATE_NEW', (data: Partial<TaskStatusMove>) => ({
  form: CREATE_TASK_STATUS_MOVE_FORM,
  request: {
    data,
    method: 'POST',
    url: '/task-status-moves',
  },
}));

export const deleteTaskStatusMove = requestActions('TASK_STATUS_MOVES/DELETE', (id: number) => ({
  id,
  request: {
    method: 'DELETE',
    url: `/task-status-moves/${id}`,
  },
}));

export const deleteManyTaskStatusMoves = requestActions('TASK_STATUS_MOVES/DELETE_MANY', (ids: number[]) => ({
  ids,
  request: {
    data: {
      ids,
    },
    method: 'DELETE',
    url: '/task-status-moves/bulk',
  },
}));
