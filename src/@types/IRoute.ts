import { ComponentType } from 'react';
import { ACCESS_LEVEL } from '../store/projects';

export interface IRoute {
  accessLevel?: ACCESS_LEVEL;
  component?: ComponentType | any;
  exact?: boolean;
  icon?: ComponentType | any;
  path?: string;
  routes: IRoute[];
  title?: string;
  redirect?: string;
}
