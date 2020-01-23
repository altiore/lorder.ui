import { IUser } from '@types';
import { requestActions } from '#/@store/@common/requestActions';

export const fetchUsers = requestActions('USERS/FETCH_ALL', () => ({
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

export const patchUser = requestActions('USERS/PATCH', ({ user, role }: { user: IUser; role: string }) => ({
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

export const deleteUser = requestActions('USERS/DELETE', (userId: number) => ({
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
