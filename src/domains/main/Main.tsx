import * as React from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';

import { IRoute } from 'src/@types';
import { RouteWithSubRoutes } from 'src/domains/@common/RouteWithSubRoutes';
import { DashboardTaskForm } from 'src/domains/@common/TaskForm';
import { Header } from './Header';

export interface IMainProps {
  classes: any;
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
      this.props.openDialog(
        <DashboardTaskForm taskId={nextProps.location.state.taskId} projectId={nextProps.location.state.projectId} />,
        { maxWidth: 'lg' },
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
        {/*<div className={classes.background} />*/}
        {/*<div className={classes.background2} />*/}
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
