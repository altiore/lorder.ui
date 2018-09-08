import { requestActions } from 'src/store/@common/requestActions';

export const fetchUsers = requestActions('USERS/FETCH_ALL', () => ({
  request: {
    url: '/users',
  },
}));

export const deleteUser = requestActions('USERS/DELETE', (userId: number) => ({
  request: {
    method: 'delete',
    url: `/users/${userId}`,
  },
  userId,
}));
