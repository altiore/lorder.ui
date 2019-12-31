import { requestActions } from '@store/@common/requestActions';
import { PROJECT_EDIT_TASK_FORM, PROJECT_TASK_FORM_NAME } from '@store/projects';
import { User } from '@store/users';
import { createAction } from 'redux-actions';

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

export const getAllProjectTasks = requestActions('PROJECT_TASK/GET_ALL', (projectId: number): any => ({
  projectId,
  request: {
    params: {
      count: 100,
      order: 'desc',
      orderBy: 'id',
      skip: 0,
    },
    url: `/projects/${projectId}/tasks`,
  },
}));

export const postProjectTask = requestActions<IProjectTaskData>(
  'PROJECT_TASK/POST',
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
      source,
      status,
      performerId,
      title,
      value,
    };
    return {
      form: PROJECT_EDIT_TASK_FORM,
      projectId,
      request: {
        data,
        method: 'PATCH',
        url: `/projects/${projectId}/tasks/${sequenceNumber}`,
      },
      success: {
        message: 'Задача успешно обновлена',
        title: 'Успех!',
      },
      sequenceNumber,
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
    success: {
      message: `Задача удалена из проекта`,
    },
    sequenceNumber,
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

export const updateProjectTask = createAction('PROJECT_TASK/UPDATE_FROM_SOCKET');
