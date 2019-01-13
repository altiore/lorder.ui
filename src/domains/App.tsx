import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import { IRoute, ROLE } from 'src/@types';
import { LoadingPage } from 'src/components/LoadingPage';

// import "react-perfect-scrollbar/dist/css/styles.css";
import '../styles/app.scss';
import { RouteWithSubRoutes } from './@common/RouteWithSubRoutes';
import { Start } from './start';

export interface IAppProps extends RouteComponentProps<{}> {
  // TODO: split reducers to several chunks
  // injectAsyncReducers: (role: ROLE) => Promise<void>;
  userIsLoading: boolean;
  userRole: ROLE;
}

export interface IState {
  error: any;
  isLoading: boolean;
  routes: IRoute[];
}

export class AppTsx extends React.Component<IAppProps, IState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      error: null,
      isLoading: true,
      routes: [],
    };
  }

  componentDidMount() {
    const { userRole } = this.props;
    this.checkAccess(userRole);
  }

  componentWillUpdate(nextProps: IAppProps, nextState: IState) {
    if (this.props.userRole !== nextProps.userRole) {
      this.setState({ isLoading: true }, () => this.checkAccess(nextProps.userRole));
    }
  }

  render() {
    const { isLoading, routes } = this.state;
    const { userIsLoading } = this.props;
    const { userRole } = this.props;
    if (isLoading || userIsLoading || !routes) {
      return <LoadingPage />;
    }
    return (
      <Switch>
        <Redirect from="/index.html" to="/" exact />
        <Route path={'/start/:identifier'} component={Start} />
        {routes.length && routes.map(route => <RouteWithSubRoutes key={route.path || 'notFound'} {...route} />)}
        {userRole === ROLE.GUEST && <Redirect to={'/'} />}
      </Switch>
    );
  }

  private checkAccess(role: ROLE = ROLE.GUEST) {
    // TODO: split reducers to several chunks
    // this.props.injectAsyncReducers(role).then(() => {
    //   let getRoutes: Promise<{ routes: any }>;
    //   switch (role) {
    //     case ROLE.ADMIN:
    //       getRoutes = import(/* webpackChunkName: "admin" */ './@routes/admin');
    //       break;
    //     case ROLE.SUPER_ADMIN:
    //       getRoutes = import(/* webpackChunkName: "super-admin" */ './@routes/super-admin');
    //       break;
    //     case ROLE.USER:
    //       getRoutes = import(/* webpackChunkName: "user" */ './@routes/user');
    //       break;
    //     default:
    //       getRoutes = import(/* webpackChunkName: "guest" */ './@routes/guest');
    //       break;
    //   }
    //   this.loadRoutes(getRoutes);
    // });
    let getRoutes: Promise<{ routes: any }>;
    switch (role) {
      case ROLE.ADMIN:
        getRoutes = import(/* webpackChunkName: "admin" */ '../@routes/admin');
        break;
      case ROLE.SUPER_ADMIN:
        getRoutes = import(/* webpackChunkName: "super-admin" */ '../@routes/super-admin');
        break;
      case ROLE.USER:
        getRoutes = import(/* webpackChunkName: "user" */ '../@routes/user');
        break;
      default:
        getRoutes = import(/* webpackChunkName: "guest" */ '../@routes/guest');
        break;
    }
    this.loadRoutes(getRoutes);
  }

  private loadRoutes(getRoutes: Promise<{ routes: any }>) {
    getRoutes
      .then(({ routes }) => this.setState({ routes, isLoading: false }))
      .catch((error: any) => this.setState({ error, isLoading: false }));
  }
}
