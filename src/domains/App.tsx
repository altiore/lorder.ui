import * as React from 'react';
import { Redirect, RouteComponentProps, Switch } from 'react-router-dom';

import { IRoute } from 'src/@types';
import { LoadingPage } from 'src/domains/@common/LoadingPage';
import { IUserRole } from 'src/store/user';

import '../styles/app.scss';
import { RouteWithSubRoutes } from './@common/RouteWithSubRoutes';

export interface IAppProps extends RouteComponentProps<{}> {
  userRole?: IUserRole;
}

export interface IState {
  error: any;
  isLoading: boolean;
  routes: IRoute[];
}

export class App extends React.PureComponent<IAppProps, IState> {
  constructor(props: IAppProps){
    super(props);
    this.state = {
      error: null,
      isLoading: true,
      routes: [],
    };
  }

  public componentDidMount() {
    const { userRole } = this.props;
    this.checkAccess(userRole)
  }

  public componentDidUpdate(prevProps: IAppProps, prevState: IState) {
    if (this.props.userRole !== prevProps.userRole) {
      this.checkAccess(this.props.userRole)
    }
  }

  public render() {
    const { isLoading, routes } = this.state;
    if (isLoading) {
      return <LoadingPage />
    }
    const { userRole } = this.props;
    return (
      <Switch>
        {userRole !== 'guest' && <Redirect from='/start' to='/' />}
        {routes.map(route => <RouteWithSubRoutes key={route.path + userRole} {...route} />)}
      </Switch>
    );
  }

  private checkAccess(role?: IUserRole) {
    let getRoutes: Promise<any>;
    switch (role) {
      case 'user':
        getRoutes = import(/* webpackChunkName: "user" */ './@routes/user');
        break;
      default:
        getRoutes = import(/* webpackChunkName: "guest" */ './@routes/guest');
        break;
    }
    getRoutes
      .then(({ routes }) => this.setState({ routes, isLoading: false }))
      .catch((error: any) => this.setState({ error, isLoading: false }));
  }
}
