import { createApiAction } from 'redux-actions-api';

import { IUser } from '@types';

export const fetchUsers = createApiAction('USERS/FETCH_ALL', () => ({
  request: {
    params: {
      count: 20000,
      order: 'desc',
      orderBy: 'createdAt',
      skip: 0,
    },
    url: '/users',
  },
}));

export const patchUser = createApiAction('USERS/PATCH', ({ user, role }: { user: IUser; role: string }) => ({
  request: {
    data: { role },
    method: 'patch',
    url: `/users/${user.id}`,
  },
  role,
  success: {
    message: `Роль пользователя ${user.email} успешна изменена на "${role}"`,
    title: 'Успех!',
  },
  user,
}));

export const deleteUser = createApiAction('USERS/DELETE', (userId: number) => ({
  request: {
    method: 'delete',
    url: `/users/${userId}`,
  },
  success: {
    message: `Ничего не бойся, я с тобой...`,
    title: 'Успех!',
  },
  userId,
}));
