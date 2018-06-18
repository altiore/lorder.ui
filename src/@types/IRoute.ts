import { ComponentType } from 'react';

export interface IRoute {
  path: string,
  component: ComponentType | any,
  routes: IRoute[],
  exact?: boolean,
}
