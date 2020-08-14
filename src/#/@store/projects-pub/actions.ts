import { requestActions } from '#/@store/@common/requestActions';

export const fetchProjectsPubAct = requestActions<any>('PUBLIC_PROJECTS/FETCH_LIST', () => ({
  error: {
    message: 'Не удалось получить публичные проекты',
    title: 'Ошибка',
  },
  request: {
    url: '/public-projects',
  },
}));
