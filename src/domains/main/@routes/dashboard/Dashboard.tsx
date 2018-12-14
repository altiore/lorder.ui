import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { IEvent } from 'src/components/DailyRoutine';
import { PageCenter } from 'src/components/PageCenter';
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
    const { tasks } = this.props;
    const { page, perPage } = this.state;
    const length = tasks.length;
    const sortedTasks = tasks.slice(page * 4, (page + 1) * 4);
    return (
      <PageCenter>
        <DailyRoutine onChange={this.handleOnChange} />
        <Grid item lg={9} md={8} sm={12}>
          <StartForm />
          <List>
            <CurrentTask />
            <Filter page={page} perPage={perPage} count={length} changePage={this.handleChangePage} />
            {sortedTasks.map(this.renderListItem)}
          </List>
        </Grid>
        <Grid item lg={3} md={4} sm={12}>
          <LastEvents />
        </Grid>
      </PageCenter>
    );
  }

  private handleOnChange(events: IEvent[]): any {
    console.log('values', events);
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
