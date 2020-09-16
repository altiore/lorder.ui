import { createApiAction } from 'redux-actions-api';

import { Feedback } from './Feedback';

export const fetchFeedbackList = createApiAction('FEEDBACK/FETCH_ALL', () => ({
  request: {
    params: {
      count: 2000,
      order: 'desc',
      orderBy: 'id',
      skip: 0,
    },
    url: '/feedback',
  },
}));

export const postFeedbackReq = createApiAction('FEEDBACK/POST', (data: Partial<Feedback>) => ({
  request: {
    data,
    method: 'post',
    url: '/feedback',
  },
  success: {
    message: 'Нам очень важно ваше мнение!',
    title: 'Спасибо за ваш отзыв!',
  },
}));
