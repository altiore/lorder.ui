import { requestActions } from 'src/store/@common/requestActions';
import { Feedback } from './Feedback';

export const fetchFeedbacks = requestActions('FEEDBACK/FETCH_ALL', () => ({
  request: {
    params: {
      count: 2000,
      order: 'desc',
      orderBy: 'createdAt',
      skip: 0,
    },
    url: '/feedback',
  },
}));

export const postFeedback = requestActions('FEEDBACK/POST', (data: Partial<Feedback>) => ({
  request: {
    data,
    method: 'patch',
    url: '/feedback',
  },
  success: {
    message: 'Наши специалисты свяжутся с вами в ближайшее время',
    title: 'Успех!',
  },
}));
