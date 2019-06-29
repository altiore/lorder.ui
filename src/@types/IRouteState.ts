import { RouterState } from 'connected-react-router';

export interface IRouteState extends RouterState {
  routes: Array<{
    access: any;
    path: string;
    // [key in any]: any;
  }>;
}
