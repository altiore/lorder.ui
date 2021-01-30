import { createApiAction } from 'redux-actions-api';

export const fetchProjectsStatisticAct = createApiAction<any>('PROJECT_STATISTICS/FETCH_LIST', () => ({
  error: {
    message: 'Не удалось получить публичные проекты',
    title: 'Ошибка',
  },
  request: {
    url: '/project-statistics',
  },
}));
