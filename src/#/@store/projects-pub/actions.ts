import { createApiAction } from 'redux-actions-api';

export const fetchProjectsPubAct = createApiAction<any>('PUBLIC_PROJECTS/FETCH_LIST', () => ({
  error: {
    message: 'Не удалось получить публичные проекты',
    title: 'Ошибка',
  },
  request: {
    url: '/public-projects',
  },
}));
