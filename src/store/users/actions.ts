import { requestActions } from 'src/store/@common/requestActions';

export const fetchUsers = requestActions('USERS/FETCH_ALL', () => ({
  request: {
    url: '/users',
  },
}));

export const patchUser = requestActions('USERS/PATCH', ({ id, role }: { id: number; role: string }) => ({
  request: {
    data: { role },
    method: 'patch',
    url: `/users/${id}`,
  },
  role,
  userId: id,
}));

export const deleteUser = requestActions('USERS/DELETE', (userId: number) => ({
  request: {
    method: 'delete',
    url: `/users/${userId}`,
  },
  userId,
}));
