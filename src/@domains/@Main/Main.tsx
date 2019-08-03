import React, { lazy } from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';

import { IRoute } from '@types';
import { RouteWithSubRoutes } from '@domains/@common/RouteWithSubRoutes';
import { DashboardTaskForm } from '@domains/@common/TaskForm';
import { Header } from './Header';

export const ROUTES_BY_PATH = {
  '/': lazy(() => import('./@Dashboard')),
  '/all-projects': lazy(() => import('@domains/@Main/@Projects/list/all')),
  '/feedback': lazy(() => import('@domains/@Main/@routes/feedback')),
  '/projects': lazy(() => import('./@Projects/list')),
  '/projects/:projectId': lazy(() => import('./@Projects/one')),
  '/task-types': lazy(() => import('@domains/@Main/@routes/task-types')),
  '/users': lazy(() => import('@domains/@Main/@routes/users')),
  '/profile': lazy(() => import('@domains/@Main/@Profile')),
};

export interface IMainProps {
  classes: any;
  closeDialog: any;
  openDialog: any;
  push: any;
  routes: IRoute[];
}

export class MainJsx extends React.Component<RouteComponentProps<{}> & IMainProps, {}> {
  componentWillUpdate(
    nextProps: Readonly<RouteComponentProps<{}> & IMainProps>,
    nextState: Readonly<{}>,
    nextContext: any
  ): void {
    if (nextProps.location !== this.props.location && nextProps.location.state && nextProps.location.state.modal) {
      const prevLocation = this.props.location;
      this.props.openDialog(
        <DashboardTaskForm taskId={nextProps.location.state.taskId} projectId={nextProps.location.state.projectId} />,
        {
          maxWidth: 'lg',
          onClose: () => {
            this.props.closeDialog();
            this.props.push(prevLocation.pathname);
          },
        },
        this.props.location
      );
    }
  }

  render() {
    const { routes } = this.props;
    if (!routes) {
      return null;
    }

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <div className={classes.background} />
        <div className={classes.background2} />
        <main className={classes.main}>
          <Switch>
            {routes.map((route: IRoute) => (
              <RouteWithSubRoutes key={route.path} component={ROUTES_BY_PATH[route.path]} {...route} />
            ))}
          </Switch>
        </main>
      </div>
    );
  }
}
