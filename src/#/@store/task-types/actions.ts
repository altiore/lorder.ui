import { requestActions } from '#/@store/@common/requestActions';

export interface IPostTaskTypeData {
  name: string;
}

export const getAllTaskTypes = requestActions('TASK_TYPES/GET_ALL', () => ({
  request: {
    url: '/task-types',
  },
}));

export const postTaskType = requestActions<IPostTaskTypeData>('TASK_TYPES/POST', (data: IPostTaskTypeData) => ({
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

export const deleteTaskType = requestActions('TASK_TYPES/DELETE', (taskTypeId: number) => ({
  request: {
    method: 'DELETE',
    url: `/task-types/${taskTypeId}`,
  },
}));
