import { createAction } from 'redux-actions';

export interface IPostAuthMagicData {
  email: string;
}

export const postAuthMagic = createAction('USER/MAGIC_LINK', (data: IPostAuthMagicData) => ({
  request: {
    data,
    method: 'POST',
    url: '/auth/magic',
  },
}));

export const logIn = createAction('USER/LOGIN', (data: { username: string, password: string }) => ({
  request: {
    data,
    method: 'POST',
    url: '/login',
  },
}));
