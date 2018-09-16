import * as React from 'react';
import { Redirect, RouteComponentProps, Switch } from 'react-router-dom';

import { IRoute } from 'src/@types';
import { LoadingPage } from 'src/domains/@common/LoadingPage';
import { store } from 'src/index';
import { injectAsyncReducers } from 'src/store/createStore';
import { IIdentityRole } from 'src/store/identity';

import '../styles/app.scss';
import { RouteWithSubRoutes } from './@common/RouteWithSubRoutes';

export interface IAppProps extends RouteComponentProps<{}> {
  userRole?: IIdentityRole;
}

export interface IState {
  error: any;
  isLoading: boolean;
  routes: IRoute[];
}

export class App extends React.PureComponent<IAppProps, IState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      error: null,
      isLoading: true,
      routes: [],
    };
  }

  public componentDidMount() {
    const { userRole } = this.props;
    this.checkAccess(userRole);
  }

  public componentDidUpdate(prevProps: IAppProps, prevState: IState) {
    if (this.props.userRole !== prevProps.userRole) {
      this.setState({ isLoading: true }, () => this.checkAccess(this.props.userRole));
    }
  }

  public render() {
    const { isLoading, routes } = this.state;
    if (isLoading || !routes) {
      return <LoadingPage />;
    }
    const { userRole } = this.props;
    return (
      <Switch>
        {userRole !== 'guest' && <Redirect from="/start" to="/" />}
        {routes.map(route => (
          <RouteWithSubRoutes key={route.path + userRole} {...route} />
        ))}
        {userRole === 'guest' && <Redirect to="/" />}
      </Switch>
    );
  }

  private checkAccess(role?: IIdentityRole) {
    let getRoutes: Promise<any>;
    switch (role) {
      case 'admin':
        getRoutes = import(/* webpackChunkName: "admin" */ './@routes/admin');
        import(/* webpackChunkName: "admin" */ 'src/store/adminReducers').then(({ adminReducers }) => {
          injectAsyncReducers(store, adminReducers);
          this.loadRoutes(getRoutes);
        });
        break;
      case 'super-admin':
        getRoutes = import(/* webpackChunkName: "super-admin" */ './@routes/super-admin');
        import(/* webpackChunkName: "super-admin" */ 'src/store/adminReducers').then(({ adminReducers }) => {
          injectAsyncReducers(store, adminReducers);
          this.loadRoutes(getRoutes);
        });
        break;
      case 'user':
        getRoutes = import(/* webpackChunkName: "user" */ './@routes/user');
        import(/* webpackChunkName: "user" */ 'src/store/userReducers').then(({ userReducers }) => {
          injectAsyncReducers(store, userReducers);
          this.loadRoutes(getRoutes);
        });
        break;
      default:
        getRoutes = import(/* webpackChunkName: "guest" */ './@routes/guest');
        this.loadRoutes(getRoutes);
        break;
    }
  }

  private loadRoutes(getRoutes: Promise<{ routes: any }>) {
    getRoutes
      .then(({ routes }) => this.setState({ routes, isLoading: false }))
      .catch((error: any) => this.setState({ error, isLoading: false }));
  }
}
