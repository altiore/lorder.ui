import { createApiAction } from 'redux-actions-api';

export interface IPostTaskTypeData {
  name: string;
}

export const getAllTaskTypes = createApiAction('TASK_TYPES/GET_ALL', () => ({
  request: {
    url: '/task-types',
  },
}));

export const postTaskType = createApiAction<IPostTaskTypeData>('TASK_TYPES/POST', (data: IPostTaskTypeData) => ({
  error: {
    message: 'Не удалось сохранить тип задачи',
    title: 'Неудача',
  },
  form: 'TaskTypeForm',
  request: {
    data,
    method: 'POST',
    url: '/task-types',
  },
  success: {
    message: 'Теперь вы можете использовать этот тип задачи в любом проекте',
    title: 'Глобальный тип задачи успешно добавлен!',
  },
}));

export const deleteTaskType = createApiAction('TASK_TYPES/DELETE', (taskTypeId: number) => ({
  request: {
    method: 'DELETE',
    url: `/task-types/${taskTypeId}`,
  },
}));
