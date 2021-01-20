import { createAction } from 'redux-actions';
import { createApiAction } from 'redux-actions-api';

import { LOGIN_FORM_NAME, MAGIC_FORM_NAME } from './consts';

export interface IPostAuthMagicData {
  email: string;
}

export interface IGetAuthActivateData {
  oneTimeToken: string;
  project?: string;
}

export const postAuthMagic = createApiAction<IPostAuthMagicData>(
  'USER/SEND_MAGIC_LINK',
  (data: IPostAuthMagicData) => ({
    error: false,
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
  })
);

export const getAuthActivate = createApiAction<IGetAuthActivateData>(
  'USER/ACTIVATE_BY_MAGIC_LINK',
  (params: IGetAuthActivateData) => ({
    request: {
      params,
      url: '/auth/activate',
    },
  })
);

export const logInPatch = createApiAction('USER/LOGIN', (data: { email: string; password: string }) => ({
  error: false,
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

export const registerPost = createApiAction('USER/REGISTER', (data: { email: string; password: string }) => ({
  error: false,
  form: LOGIN_FORM_NAME,
  noAuth: true,
  request: {
    data,
    method: 'POST',
    url: '/auth/register',
  },
}));

export const setIsLoading = createAction('IDENTITY/SET_IS_LOADING');

export const uploadAvatar = createApiAction('USER/UPLOAD_AVATAR', file => ({
  request: {
    data: { file },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'POST',
    url: '/users/avatar/update',
  },
}));

export const updateProfile = createApiAction(
  'ME/UPDATE',
  ({
    displayName,
    tel,
    telegram = '',
    gitHub = '',
    linkedIn = '',
  }: {
    displayName?: string;
    tel?: string;
    telegram?: string;
    gitHub?: string;
    linkedIn?: string;
  }) => ({
    form: 'ProfileForm',
    request: {
      data: {
        displayName,
        gitHub: gitHub || '',
        linkedIn: linkedIn || '',
        tel: tel || null,
        telegram: telegram || '',
      },
      method: 'patch',
      url: `/me`,
    },
    success: {
      message: 'Данные успешна обновлены',
      title: 'Успех!',
    },
  })
);

export const refreshToken = createApiAction('ME/REFRESH_TOKEN', (token: string, device: string) => ({
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

export const updatePasswordAct = createApiAction(
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
