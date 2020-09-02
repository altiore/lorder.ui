import { Notification } from 'react-notification-system';

import { requestActions } from '#/@store/@common/requestActions';

import { UPDATE_PROJECT_FORM } from './consts';

export interface IPostProjectData {
  monthlyBudget?: string | number;
  title: string;
  type: string;
}

export const postProject = requestActions<IPostProjectData>(
  'PROJECTS/POST',
  ({ monthlyBudget, title, type }: IPostProjectData) => ({
    error: {
      message: 'Не удалось сохранить проект',
      title: 'Неудача',
    },
    form: 'ProjectForm',
    request: {
      data: {
        monthlyBudget: monthlyBudget && parseInt(monthlyBudget as string, 0),
        title,
        type,
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

export const fetchAllParticipantProjectsAction = requestActions('PROJECTS/GET_ALL_PARTICIPANT_PROJECTS', () => ({
  request: {
    url: '/projects',
  },
}));

export const getAllProjects = requestActions('PROJECTS/GET_ALL(SUPER_ADMIN)', () => ({
  request: {
    params: {
      count: 20000,
      order: 'desc',
      orderBy: 'createdAt',
      skip: 0,
    },
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

export const removeProjectByAdmin = requestActions('PROJECTS/REMOVE', (projectId: number) => ({
  projectId,
  request: {
    method: 'DELETE',
    url: `/projects/${projectId}/admin`,
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
  projectId,
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
    method: 'PATCH',
    url: `/projects/${projectId}/statistic`,
  },
  success: {
    message: 'Теперь она доступна на публичной странице проекта',
    title: 'Статистика обновлена!',
  },
}));

export const updateProjectAct = requestActions<number, any>(
  'PROJECT/UPDATE',
  (projectId: number, data: { desc?: string; title: string; monthlyBudget: number; slogan?: string }) => ({
    form: UPDATE_PROJECT_FORM,
    request: {
      data: {
        ...data,
        desc: data.desc || null,
        slogan: data.slogan || null,
      },
      method: 'PATCH',
      url: `/projects/${projectId}`,
    },
    success: {
      message: 'Ничего не бойся я с тобой',
      title: 'Проект обновлен',
    },
  })
);

export const uploadLogoAct = requestActions('PROJECTS/UPLOAD_LOGO', (file, projectId) => ({
  projectId,
  request: {
    data: { file },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'POST',
    url: `/projects/${projectId}/logo`,
  },
}));

export * from './members/actions';
export * from './taskTypes/actions';
export * from './taskTypes/thunk';
