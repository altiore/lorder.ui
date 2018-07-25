import { requestActions } from 'src/store/@common/requestActions';

export const fetchUsers = requestActions('USERS/FETCH_ALL', () => ({
  request: {
    url: '/users',
  },
}));
