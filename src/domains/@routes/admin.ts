import { Digits } from '../digits';
import { Main } from '../main';
import { NoMatch } from '../noMatch';
import { Profile } from '../profile';

export const routes = [
  {
    component: Main,
    path: '/',
  },
  {
    component: Digits,
    path: '/digits',
  },
  {
    component: Profile,
    path: '/profile',
  },
  {
    component: NoMatch,
  },
];
