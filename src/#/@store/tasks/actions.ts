import omit from 'lodash/omit';
import { createAction } from 'redux-actions';
import { createApiAction } from 'redux-actions-api';

import { PROJECT_TASK_FORM_NAME } from '#/@store/projects';
import { TASKS_ROUTE } from '#/@store/router';

import { EDIT_TASK_FORM, ITaskFormData } from './consts';

export const getAllTasks = createApiAction('TASKS/GET_ALL', () => ({
  request: {
    url: '/tasks',
  },
}));

export const fetchProjectTasksA = createApiAction(
  'TASKS/FETCH_TASKS_BY_PROJECT',
  ({ projectId, skip = 0, count = 100 }, force: boolean = false) => ({
    force,
    projectId,
    request: {
      params: {
        count,
        order: 'desc',
        orderBy: 'id',
        skip,
      },
      url: TASKS_ROUTE(projectId),
    },
  })
);

/**
 * TODO: should be moved to projects/tasks directory
 */
export const fetchTaskDetailsA = createApiAction('TASKS/FETCH_DETAILS', ({ projectId, sequenceNumber }) => ({
  request: {
    url: `${TASKS_ROUTE(projectId)}/${sequenceNumber}`,
  },
  sequenceNumber,
}));

export const archiveTaskA = createApiAction(
  'TASKS/ARCHIVE',
  ({ taskId, projectId, sequenceNumber }: { taskId: number; sequenceNumber: number; projectId: number }) => ({
    projectId,
    request: {
      method: 'PATCH',
      url: `/tasks/${taskId}/archive`,
    },
    sequenceNumber,
    taskId,
  })
);

export const postProjectTask = createApiAction<Partial<ITaskFormData>>(
  'TASKS/POST_PROJECT_TASK',
  ({ projectId, ...data }: Partial<ITaskFormData>) => ({
    form: PROJECT_TASK_FORM_NAME,
    projectId,
    request: {
      data,
      method: 'POST',
      url: TASKS_ROUTE(projectId),
    },
    success: {
      message: `Новая задача добавлена в проект`,
      title: 'Успех!',
    },
  })
);

export const patchProjectTask = createApiAction<Partial<ITaskFormData>>(
  'PROJECT_TASK/PATCH',
  ({ projectId, sequenceNumber, ...rest }: Partial<ITaskFormData>) => {
    return {
      form: EDIT_TASK_FORM,
      projectId,
      request: {
        data: omit(rest, ['id', 'isDetailsLoaded']),
        method: 'PATCH',
        url: `${TASKS_ROUTE(projectId)}/${sequenceNumber}`,
      },
      sequenceNumber,
      success: {
        message: 'Задача успешно обновлена',
        title: 'Успех!',
      },
    };
  }
);

interface IMoveReqData {
  projectId: number;
  sequenceNumber: number;
  statusTypeName: string;
  prevStatusTypeName: string;
  selectedRole: string;
}

export const moveProjectTaskAct = createApiAction<IMoveReqData>(
  'PROJECT_TASK/MOVE',
  ({ prevStatusTypeName, projectId, selectedRole, sequenceNumber, statusTypeName }) => ({
    error: false,
    prevStatusTypeName,
    projectId,
    request: {
      data: {
        selectedRole,
        statusTypeName,
      },
      method: 'PATCH',
      url: `${TASKS_ROUTE(projectId)}/${sequenceNumber}/move`,
    },
    sequenceNumber,
  })
);

export const updateProjectTask = createAction('TASK/UPDATE_FROM_SOCKET');

export const clearAllProjectTask = createAction('TASKS/CLEAR_ALL_TASKS');
