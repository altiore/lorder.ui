import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { IRoute } from 'src/@types';
import { IUserRole } from 'src/store/user';

import '../styles/app.scss';
import { RouteWithSubRoutes } from './@common/RouteWithSubRoutes';

export interface IAppProps {
  userRole?: IUserRole,
}

export interface IState {
  error: any,
  isLoading: boolean,
  routes: IRoute[],
}

export class App extends React.Component<IAppProps, IState> {
  constructor(props: any){
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
    console.log('prevProps', prevProps, this.props);
    if (this.props.userRole !== prevProps.userRole) {
      this.checkAccess(this.props.userRole)
    }
  }

  public render() {
    const { isLoading, routes } = this.state;
    if (isLoading) {
      return <div>loading...</div>
    }
    const { userRole } = this.props;
    console.log('render App with role', userRole, routes);
    return (
      <React.Fragment>
        {userRole !== 'guest' ? (
          <Redirect to='/dashboard' from='/start' />
        ) : (
          <Redirect to='/' from='/dashboard' exact />
        )}
        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
      </React.Fragment>
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
