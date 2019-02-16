import * as React from 'react';
import FlipMove from 'react-flip-move';

import { ITask } from 'src/@types';
import { Project } from 'src/store/projects';
import { Filter } from './Filter';
import { TaskComponent } from './TaskComponent';

export interface IState {
  page: number;
  perPage: number;
}

export interface ITasksListProps {
  currentTaskId?: number | string;
  getProjectById: (id: number | string) => Project;
  tasks: Array<ITask | 'filter'>;
  tasksFilter: any;
}

export class TasksListJsx extends React.Component<ITasksListProps, IState> {
  state = {
    page: 0,
    perPage: 4,
  };

  shouldComponentUpdate(nextProps: Readonly<ITasksListProps>, nextState: Readonly<IState>, nextContext: any): boolean {
    if (
      (nextProps.currentTaskId !== this.props.currentTaskId && nextProps.currentTaskId) ||
      nextProps.tasksFilter !== this.props.tasksFilter ||
      nextState.page !== this.state.page ||
      nextState.perPage !== this.state.perPage
    ) {
      return true;
    }
    return false;
  }

  render() {
    const { tasks } = this.props;
    const { page, perPage } = this.state;
    const sortedTasks = [...tasks.slice(0, 2), ...tasks.slice(page * perPage + 2, (page + 1) * perPage + 2)];
    return <FlipMove>{sortedTasks.map(this.renderListItem)}</FlipMove>;
  }

  private renderListItem = (task: ITask | 'filter', index: number) => {
    const { currentTaskId, getProjectById } = this.props;
    if (task === 'filter') {
      const { tasks } = this.props;
      const { page, perPage } = this.state;
      const length = tasks.length - 2;
      return <Filter key={index} page={page} perPage={perPage} count={length} changePage={this.handleChangePage} />;
    }
    return (
      <TaskComponent
        key={task.id}
        isCurrent={currentTaskId === task.id}
        task={task}
        project={getProjectById(task.projectId)}
      />
    );
  };

  private handleChangePage = (index: number) => () => {
    let page = index;
    const { tasks } = this.props;
    const { perPage } = this.state;
    const length = tasks.length - 2;
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
