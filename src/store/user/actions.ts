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
