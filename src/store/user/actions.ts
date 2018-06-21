import { createAction } from 'redux-actions';

import { requestActions } from 'src/store/@common/requestActions';

export interface IPostAuthMagicData {
  email: string;
}

export const postAuthMagic = requestActions<IPostAuthMagicData>('USER/SEND_MAGIC_LINK', (data: IPostAuthMagicData) => ({
  request: {
    data,
    method: 'POST',
    url: '/auth/magic',
  },
  success: {
    message: 'Проверьте email, чтоб продолжить работу',
    title: 'Ссылка отправлена!',
  },
}));

export const getAuthActivate = requestActions<string>('USER/ACTIVATE_BY_MAGIC_LINK', (identifier: string) => ({
  request: {
    params: { identifier },
    url: '/auth/activate',
  },
}));

export const logIn = requestActions('USER/LOGIN', (data: { username: string, password: string }) => ({
  request: {
    data,
    method: 'POST',
    url: '/login',
  },
}));

export const logOut = createAction('USER/LOGOUT');

export * from './thunk';
