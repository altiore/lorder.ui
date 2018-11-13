import { ComponentType } from 'react';

export interface IRoute {
  component?: ComponentType | any;
  exact?: boolean;
  icon?: ComponentType | any;
  path?: string;
  routes: IRoute[];
  title?: string;
  redirect?: string;
}
