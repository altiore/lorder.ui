import { createAction } from 'redux-actions';

export const logIn = createAction('USER/LOGIN', (data: { username: string, password: string }) => ({
  request: {
    data,
    method: 'POST',
    url: '/login',
  },
}));
