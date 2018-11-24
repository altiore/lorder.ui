import { Notification } from 'react-notification-system';

import { requestActions } from 'src/store/@common/requestActions';

export interface IPostProjectData {
  monthlyBudget?: string | number;
  title: string;
}

export const postProject = requestActions<IPostProjectData>(
  'PROJECTS/POST',
  ({ monthlyBudget, title }: IPostProjectData) => ({
    error: {
      message: 'Не удалось сохранить проект',
      title: 'Неудача',
    },
    form: 'ProjectForm',
    request: {
      data: {
        monthlyBudget: monthlyBudget && parseInt(monthlyBudget as string, 0),
        title,
      },
      method: 'POST',
      url: '/projects',
    },
    success: {
      message: 'Добавьте варианты задач для проекта, чтобы продолжить',
      title: 'Новый проект успешно создан!',
    },
  })
);

export const getOwnProjects = requestActions('PROJECTS/GET_ALL_OWN', () => ({
  request: {
    url: '/projects',
  },
}));

export const getAllProjects = requestActions('PROJECTS/GET_ALL(SUPER_ADMIN)', () => ({
  request: {
    url: '/projects/all',
  },
}));

export const removeProject = requestActions('PROJECTS/REMOVE', (projectId: number) => ({
  projectId,
  request: {
    method: 'DELETE',
    url: `/projects/${projectId}`,
  },
  success: {
    level: 'warning',
    message: 'Ничего не бойся - я с тобой!',
    title: 'Проект успешно удален',
  } as Notification,
}));

export const fetchProjectDetails = requestActions('PROJECTS/FETCH_ONE', (projectId: number) => ({
  request: {
    url: `/projects/${projectId}`,
  },
}));

export const publishProject = requestActions<number>('PROJECT/PUBLISH', (projectId: number) => ({
  error: {
    message: 'Возможно, у вас нет прав на это',
    title: 'Не удалось опубликовать проект',
  },
  request: {
    method: 'POST',
    url: `/projects/${projectId}/publish`,
  },
  success: {
    message: 'Теперь информация о нем доступна в публичном доступе',
    title: 'Проект опубликован!',
  },
}));

export const updateStatistic = requestActions<number>('PROJECT/STATISTIC/UPDATE', (projectId: number) => ({
  error: {
    message: 'Возможно, у вас нет прав на это',
    title: 'Не удалось обновить статистику',
  },
  request: {
    method: 'POST',
    url: `/projects/${projectId}/statistic`,
  },
  success: {
    message: 'Теперь она доступна на публичной странице проекта',
    title: 'Статистика обновлена!',
  },
}));

export * from './members/actions';
export * from './tasks/actions';
export * from './taskTypes/actions';
