import { requestActions } from 'src/store/@common/requestActions';

import { PROJECT_EDIT_TASK_FORM_NAME, PROJECT_TASK_FORM_NAME } from 'src/store/projects';
import { User } from 'src/store/users';

export interface IProjectTaskData {
  description?: string;
  projectId: number;
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
  value?: number;
  users?: User[];
  userWorks?: any;
}

export const getAllProjectTasks = requestActions(
  'PROJECT_TASK/GET_ALL',
  (projectId: number): any => ({
    projectId,
    request: {
      url: `/projects/${projectId}/tasks`,
    },
  })
);

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
  ({ description, title, projectId, id, users, userWorks, value, source }: IPatchProjectTaskData): any => {
    const data: any = {
      description,
      source,
      title,
      value,
    };
    if (users) {
      data.users = users.map(el => el.id);
    }
    return {
      form: PROJECT_EDIT_TASK_FORM_NAME,
      projectId,
      request: {
        data,
        method: 'PATCH',
        url: `/projects/${projectId}/tasks/${id}`,
      },
      success: {
        message: 'Задача успешно обновлена',
        title: 'Успех!',
      },
      taskId: id,
      users,
    };
  }
);

export const deleteProjectTask = requestActions<IProjectTaskData>(
  'PROJECT_TASK/DELETE',
  ({ projectId, taskId }: IProjectTaskData) => ({
    form: PROJECT_TASK_FORM_NAME,
    projectId,
    request: {
      method: 'DELETE',
      url: `/projects/${projectId}/tasks/${taskId}`,
    },
    success: {
      message: `Задача удалена из проекта`,
    },
    taskId,
  })
);

export const moveProjectTask = requestActions<IProjectTaskData>(
  'PROJECT_TASK/MOVE',
  ({ projectId, taskId, status, prevStatus }: IProjectTaskData) => ({
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
      url: `/projects/${projectId}/tasks/${taskId}/move`,
    },
    taskId,
  })
);
