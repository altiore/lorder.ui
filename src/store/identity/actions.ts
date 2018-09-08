import { createAction } from 'redux-actions';

import { requestActions } from 'src/store/@common/requestActions';
import { LoginFormName, MagicFormName } from './consts';

export interface IPostAuthMagicData {
  email: string;
}

export const postAuthMagic = requestActions<IPostAuthMagicData>('USER/SEND_MAGIC_LINK', (data: IPostAuthMagicData) => ({
  form: MagicFormName,
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

export const getAuthActivate = requestActions<string>('USER/ACTIVATE_BY_MAGIC_LINK', (oneTimeBearerKey: string) => ({
  request: {
    params: { oneTimeBearerKey },
    url: '/auth/activate',
  },
}));

export const logIn = requestActions('USER/LOGIN', (data: { username: string; password: string }) => ({
  form: LoginFormName,
  request: {
    data,
    method: 'PATCH',
    url: '/auth/login',
  },
  success: {
    message: 'Вы вошли в систему',
    title: 'Успех!',
  },
}));

export const logOut = createAction('USER/LOGOUT');

export * from './thunk';
