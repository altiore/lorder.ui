import { createAction } from 'redux-actions';

import { requestActions } from '#/@store/@common/requestActions';

import { LOGIN_FORM_NAME, MAGIC_FORM_NAME } from './consts';

export interface IPostAuthMagicData {
  email: string;
}

export interface IGetAuthActivateData {
  oneTimeToken: string;
  project?: string;
}

export const postAuthMagic = requestActions<IPostAuthMagicData>('USER/SEND_MAGIC_LINK', (data: IPostAuthMagicData) => ({
  fail: false,
  form: MAGIC_FORM_NAME,
  noAuth: true,
  request: {
    data: { email: data.email },
    method: 'POST',
    url: '/auth/magic',
  },
  success: {
    message: 'Проверьте email, чтоб продолжить работу',
    title: 'Ссылка отправлена!',
  },
}));

export const getAuthActivate = requestActions<IGetAuthActivateData>(
  'USER/ACTIVATE_BY_MAGIC_LINK',
  (params: IGetAuthActivateData) => ({
    request: {
      params,
      url: '/auth/activate',
    },
  })
);

export const logInPatch = requestActions('USER/LOGIN', (data: { email: string; password: string }) => ({
  fail: false,
  form: LOGIN_FORM_NAME,
  noAuth: true,
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

export const registerPost = requestActions('USER/REGISTER', (data: { email: string; password: string }) => ({
  fail: false,
  form: LOGIN_FORM_NAME,
  noAuth: true,
  request: {
    data,
    method: 'POST',
    url: '/auth/register',
  },
}));

export const setIsLoading = createAction('IDENTITY/SET_IS_LOADING');

export const uploadAvatar = requestActions('USER/UPLOAD_AVATAR', file => ({
  request: {
    data: { file },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'POST',
    url: '/users/avatar/update',
  },
}));

export const updateProfile = requestActions('ME/UPDATE', (newUserData: { displayName?: string; tel?: string }) => ({
  form: 'ProfileForm',
  request: {
    data: newUserData,
    method: 'patch',
    url: `/me`,
  },
  success: {
    message: 'Данные успешна обновлены',
    title: 'Успех!',
  },
}));

export const refreshToken = requestActions('ME/REFRESH_TOKEN', (token: string, device: string) => ({
  noAuth: true,
  request: {
    data: {
      device,
      refreshToken: token,
    },
    method: 'patch',
    url: `/auth/refresh`,
  },
}));

export const updatePasswordAct = requestActions(
  'IDENTITY/UPDATE_PASSWORD',
  (data: { email: string; password: string }) => ({
    noAuth: true,
    request: {
      data,
      method: 'patch',
      url: `/auth/update-password`,
    },
  })
);
