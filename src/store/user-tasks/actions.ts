import { requestActions } from 'src/store/@common/requestActions';

import { PROJECT_TASK_FORM_NAME } from 'src/store/projects';

export interface IUserTaskData {
  description: string;
  projectId: number;
  taskId: number;
  title: string;
  value: number;
}

export const startUserTask = requestActions<IUserTaskData>(
  'USER_TASK/POST',
  ({ projectId, ...data }: IUserTaskData): any => ({
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
