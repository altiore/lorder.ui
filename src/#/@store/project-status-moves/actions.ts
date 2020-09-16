import { createApiAction } from 'redux-actions-api';

import { CREATE_TASK_STATUS_MOVE_FORM } from './consts';
import { StatusMove } from './StatusMove';

export const fetchTaskStatusMoves = createApiAction('TASK_STATUS_MOVES/FETCH_ALL', projectId => ({
  request: {
    url: `/projects/${projectId}/project-status-move`,
  },
}));

export const createTaskStatusMove = createApiAction(
  'TASK_STATUS_MOVES/CREATE_NEW',
  (projectId: number, data: Partial<StatusMove>) => ({
    form: CREATE_TASK_STATUS_MOVE_FORM,
    request: {
      data,
      method: 'POST',
      url: `/projects/${projectId}/project-status-move`,
    },
  })
);

export const deleteTaskStatusMove = createApiAction('TASK_STATUS_MOVES/DELETE', (projectId: number, id: number) => ({
  id,
  request: {
    method: 'DELETE',
    url: `/projects/${projectId}/project-status-move/${id}`,
  },
}));
