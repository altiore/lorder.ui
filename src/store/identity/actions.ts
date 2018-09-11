import { createAction } from 'redux-actions';

import { requestActions } from 'src/store/@common/requestActions';
import { LOGIN_FORM_NAME, MAGIC_FORM_NAME } from './consts';

export interface IPostAuthMagicData {
  email: string;
}

export const postAuthMagic = requestActions<IPostAuthMagicData>('USER/SEND_MAGIC_LINK', (data: IPostAuthMagicData) => ({
  form: MAGIC_FORM_NAME,
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

export const getAuthActivate = requestActions<string>('USER/ACTIVATE_BY_MAGIC_LINK', (oneTimeToken: string) => ({
  request: {
    params: { oneTimeToken },
    url: '/auth/activate',
  },
}));

export const logIn = requestActions('USER/LOGIN', (data: { username: string; password: string }) => ({
  form: LOGIN_FORM_NAME,
  request: {
    data,
    method: 'PATCH',
    url: '/auth/login',
  },
  success: {
    message: 'Вы успешно вошли на сайт',
    title: 'Успех!',
  },
}));

export const logOut = createAction('USER/LOGOUT');

export * from './thunk';
