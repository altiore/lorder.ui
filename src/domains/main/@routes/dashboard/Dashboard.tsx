import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { Theme } from '@material-ui/core/styles';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import { RouteComponentProps } from 'react-router-dom';

import { PageCenter } from 'src/components/PageCenter';
// import { TimeLine } from 'src/components/TimeLine';
import { Project } from 'src/store/projects';
import { Task } from 'src/store/tasks';
import { CurrentTask } from './CurrentTask';
import { DailyRoutine } from './DailyRoutine';
import { Filter } from './Filter';
import { LastEvents } from './LastEvents';
import { StartForm } from './StartForm';
import { TaskComponent } from './TaskComponent';

export interface IState {
  open: any;
  page: number;
}

export interface IDashboardProps extends RouteComponentProps<{}> {
  tasks: Task[];
  theme: Theme;
  classes?: any;
  currentUserWorkId?: number | string;
  getAllTasks: any;
  getProjectById: (id: number | string) => Project;
}

export class DashboardJsx extends React.PureComponent<IDashboardProps, IState> {
  state = {
    open: {},
    page: 0,
    perPage: 4,
  };

  componentDidMount() {
    this.props.getAllTasks();
  }

  render() {
    const { classes, tasks, theme } = this.props;
    const { page, perPage } = this.state;
    const length = tasks.length;
    const sortedTasks = tasks.slice(page * 4, (page + 1) * 4);
    return (
      <>
        <div className={classes.timeLine}>
          <DailyRoutine startAt={0} finishAt={6} />
        </div>
        <PageCenter className={classes.root}>
          <Grid item lg={9} md={8} sm={12} className={classes.content}>
            <StartForm />
            <List classes={{ root: classes.listRoot }}>
              <CurrentTask />
              <Filter page={page} perPage={perPage} count={length} changePage={this.handleChangePage} />
              {sortedTasks.map(this.renderListItem)}
            </List>
          </Grid>
          <MediaQuery minDeviceWidth={theme.breakpoints.values.sm}>
            <Grid item lg={3} md={4} sm={12}>
              <LastEvents />
            </Grid>
          </MediaQuery>
        </PageCenter>
      </>
    );
  }

  private renderListItem = (task: Task) => {
    const { getProjectById } = this.props;
    return <TaskComponent key={task.id} isCurrent={false} project={getProjectById(task.projectId)} task={task} />;
  };

  private handleChangePage = (index: number) => () => {
    let page = index;
    const { tasks } = this.props;
    const { perPage } = this.state;
    const length = tasks.length;
    const max = Math.ceil(length / perPage);
    if (page < 0) {
      page = max - 1;
    }
    if (page > max - 1) {
      page = 0;
    }
    this.setState({ page });
  };
}
