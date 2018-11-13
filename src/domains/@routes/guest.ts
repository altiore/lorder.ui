import { Info } from '../landing';
import { Login } from '../login';
import { commonRoutes } from './@common';

export const routes = [
  {
    component: Login,
    path: '/login',
  },
  {
    component: Info,
    exact: true,
    path: '/',
  },
  ...commonRoutes,
  {
    redirect: '/login',
  },
];
