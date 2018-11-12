import { LocationDescriptor, LocationState } from 'history';
import * as React from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';
import { RouterAction } from 'react-router-redux';

import { IRoute } from 'src/@types';
import { RouteWithSubRoutes } from 'src/domains/@common/RouteWithSubRoutes';
import { Header } from './Header';

export interface IMainProps {
  classes: any;
  push: (location: LocationDescriptor, state?: LocationState) => RouterAction;
  routes: IRoute[];
}

export class MainJsx extends React.Component<RouteComponentProps<{}> & IMainProps, {}> {
  public goTo = (route: string) => () => {
    this.props.push(route);
  };

  public render() {
    const { routes } = this.props;
    if (!routes) {
      return null;
    }

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <main className={classes.main}>
          <Switch>
            {routes.map((route: IRoute) => (
              <RouteWithSubRoutes key={route.path || 'NotFound'} {...route} />
            ))}
          </Switch>
        </main>
      </div>
    );
  }
}
