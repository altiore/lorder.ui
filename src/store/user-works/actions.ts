import { requestActions } from 'src/store/@common/requestActions';
import { IEvent } from '../../@types';

export const getUserWorks = requestActions(
  'USER_WORK/GET_MANY',
  ({ count = 40, skip = 0, orderBy = 'startAt', order = 'desc' }): any => ({
    request: {
      params: {
        count,
        order,
        orderBy,
        skip,
      },
      url: '/user-works/recent',
    },
  })
);

export const saveUserWorks = requestActions(
  'USER_WORK/SAVE_MANY',
  (data: IEvent[]): any => ({
    data,
    request: {
      data: data.map(event => ({
        finishAt: event.finishAt,
        id: event.data.id,
        startAt: event.startAt,
      })),
      method: 'PUT',
      url: '/user-works',
    },
  })
);
