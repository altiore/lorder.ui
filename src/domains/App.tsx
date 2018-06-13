import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { IRoute } from 'src/@types';

import '../styles/app.scss';
import { RouteWithSubRoutes } from './@common/RouteWithSubRoutes';

export interface IProps {
  role: string,
}

export interface IState {
  error: any,
  isLoading: boolean,
  routes: IRoute[],
}

export class App extends React.Component<IProps, IState> {
  constructor(props: any){
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      routes: [],
    };
  }

  public componentDidMount() {
    const { role } = this.props;
    this.checkAccess(role)
  }

  public componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (this.props.role !== prevProps.role) {
      this.checkAccess(this.props.role)
    }
  }

  public render() {
    const { isLoading, routes } = this.state;
    if (isLoading) {
      return <div>loading...</div>
    }
    return (
      <Router>
        <div>
          {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        </div>
      </Router>
    );
  }

  private checkAccess(role: string) {
    this.setState({ isLoading: true });
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
