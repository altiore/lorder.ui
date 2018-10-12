import { requestActions } from 'src/store/@common/requestActions';

import { PROJECT_TASK_FORM_NAME } from 'src/store/projects';

export interface IProjectTaskData {
  description: string;
  projectId: number;
  taskId: number;
  title: string;
  value: number;
}

export const postProjectTask = requestActions<IProjectTaskData>(
  'PROJECT_TASK/POST',
  ({ projectId, ...data }: IProjectTaskData) => ({
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

export const deleteProjectTask = requestActions<IProjectTaskData>(
  'PROJECT_TASK/DELETE',
  ({ projectId, taskId }: IProjectTaskData) => ({
    form: PROJECT_TASK_FORM_NAME,
    projectId,
    request: {
      data: { id: taskId },
      method: 'DELETE',
      url: `/projects/${projectId}/tasks`,
    },
    success: {
      message: `Задача удалена из проекта`,
    },
  })
);
