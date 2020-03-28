import { createAction } from 'redux-actions';

import { User } from '#/#/@store/users';
import { requestActions } from '#/@store/@common/requestActions';
import { PROJECT_TASK_FORM_NAME } from '#/@store/projects';

import { EDIT_TASK_FORM } from './consts';

export interface IProjectTaskData {
  description?: string;
  projectId: number;
  sequenceNumber?: number;
  status?: number;
  prevStatus?: number;
  taskId?: number;
  title?: string;
  value?: number;
  users?: User[];
}

export interface IPatchProjectTaskData {
  id?: number;
  description?: string;
  projectId: number;
  title?: string;
  source?: string;
  status?: number;
  sequenceNumber?: number;
  value?: number;
  users?: User[];
  userWorks?: any;
  performerId?: number;
}

export const getAllTasks = requestActions('TASKS/GET_ALL', (): any => ({
  request: {
    url: '/tasks',
  },
}));

export const fetchProjectTasksA = requestActions(
  'TASKS/FETCH_TASKS_BY_PROJECT',
  ({ projectId, skip = 0, count = 100 }): any => ({
    projectId,
    request: {
      params: {
        count,
        order: 'desc',
        orderBy: 'id',
        skip,
      },
      url: `/projects/${projectId}/tasks`,
    },
  })
);

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

export const postProjectTask = requestActions<IProjectTaskData>(
  'TASKS/POST_PROJECT_TASK',
  ({ projectId, ...data }: IProjectTaskData): any => ({
    form: PROJECT_TASK_FORM_NAME,
    projectId,
    request: {
      data,
      method: 'POST',
      url: `/projects/${projectId}/tasks`,
    },
    success: {
      message: `Новая задача добавлена в проект`,
      title: 'Успех!',
    },
  })
);

export const patchProjectTask = requestActions<IPatchProjectTaskData>(
  'PROJECT_TASK/PATCH',
  ({
    description,
    title,
    projectId,
    value,
    performerId,
    source,
    status,
    sequenceNumber,
  }: IPatchProjectTaskData): any => {
    const data: any = {
      description,
      performerId,
      source,
      status,
      title,
      value,
    };
    return {
      form: EDIT_TASK_FORM,
      projectId,
      request: {
        data,
        method: 'PATCH',
        url: `/projects/${projectId}/tasks/${sequenceNumber}`,
      },
      sequenceNumber,
      success: {
        message: 'Задача успешно обновлена',
        title: 'Успех!',
      },
    };
  }
);

export const deleteProjectTask = requestActions<IProjectTaskData>(
  'PROJECT_TASK/DELETE',
  ({ projectId, sequenceNumber }: IProjectTaskData) => ({
    form: PROJECT_TASK_FORM_NAME,
    projectId,
    request: {
      method: 'DELETE',
      url: `/projects/${projectId}/tasks/${sequenceNumber}`,
    },
    sequenceNumber,
    success: {
      message: `Задача удалена из проекта`,
    },
  })
);

export const moveProjectTask = requestActions<IProjectTaskData>(
  'PROJECT_TASK/MOVE',
  ({ projectId, sequenceNumber, status, prevStatus }: IProjectTaskData) => ({
    error: {
      message: 'Не удалось переместить задачу',
      title: 'Упс...',
    },
    prevStatus,
    projectId,
    request: {
      data: {
        status,
      },
      method: 'PATCH',
      url: `/projects/${projectId}/tasks/${sequenceNumber}/move`,
    },
    sequenceNumber,
  })
);

export const updateProjectTask = createAction('TASK/UPDATE_FROM_SOCKET');
