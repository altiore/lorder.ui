import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ClearIcon from '@material-ui/icons/Clear';
import StopIcon from '@material-ui/icons/StopRounded';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Page } from 'src/domains/@common/Page';
import { Table } from 'src/domains/@common/Table';
import { DownloadList } from 'src/store/@common/entities';
import { Project } from 'src/store/projects';
import { TaskType } from 'src/store/task-types';
import { UserWork } from 'src/store/user-works';
import { StartForm } from './StartForm';
import { TimerCell } from './TimerCell';

export interface IDashboardProps extends RouteComponentProps<{}> {
  allUserWorks: DownloadList<UserWork>;
  classes: any;
  currentTaskId?: number;
  deleteUserWork: any;
  getProjectById: (id: number) => Project;
  getTaskTypeById: (id: number | undefined) => TaskType;
  isTimerStarted: boolean;
  getAllUserWorks: any;
  selectedProjectId: number;
  startTimer: any;
  stopUserWork: any;
}

export class DashboardJsx extends React.PureComponent<IDashboardProps> {
  public componentDidMount() {
    this.props.getAllUserWorks();
  }

  /**
   * TODO: move to persist first rehydrate place instead of this component,
   *       because we should start timer even if reload any other page
   */
  public componentWillReceiveProps(nextProps: IDashboardProps) {
    if (
      nextProps.allUserWorks !== this.props.allUserWorks &&
      nextProps.isTimerStarted === this.props.isTimerStarted &&
      !nextProps.isTimerStarted &&
      nextProps.allUserWorks.list[0] &&
      !nextProps.allUserWorks.list[0].finishAt
    ) {
      const userTask = nextProps.allUserWorks.list[0];
      this.props.startTimer(userTask);
    }
  }

  public render() {
    const { allUserWorks } = this.props;
    return (
      <Page>
        <StartForm />
        {allUserWorks &&
          !!allUserWorks.length && (
            <Table items={allUserWorks} renderItem={this.renderItem}>
              <TableHead>
                <TableRow>
                  <TableCell>Описание</TableCell>
                  <TableCell>Проект</TableCell>
                  <TableCell>Тип задачи</TableCell>
                  <TableCell numeric>Продолжительность</TableCell>
                  <TableCell numeric />
                </TableRow>
              </TableHead>
            </Table>
          )}
      </Page>
    );
  }

  private renderItem = ({ id, description, duration, projectId, taskTypeId }: UserWork) => {
    const { classes, currentTaskId, getProjectById, getTaskTypeById } = this.props;
    return (
      <TableRow className={classes.row} key={id} hover>
        <TableCell>{description}</TableCell>
        <TableCell>{getProjectById(projectId).title}</TableCell>
        <TableCell>{getTaskTypeById(taskTypeId).title}</TableCell>
        {currentTaskId === id ? <TimerCell /> : <TableCell numeric>{duration}</TableCell>}
        <TableCell numeric>
          {currentTaskId === id ? (
            <IconButton onClick={this.stopUserWork(id)} className={classes.stop}>
              <StopIcon />
            </IconButton>
          ) : (
            <IconButton onClick={this.deleteUserWork(id)}>
              <ClearIcon />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
    );
  };

  private deleteUserWork = (taskId: number | string | undefined) => () => {
    if (typeof taskId === 'number') {
      this.props.deleteUserWork(taskId);
    } else {
      console.log('deleteUserWork taskId type is %s', typeof taskId);
    }
  };

  private stopUserWork = (taskId: number | string | undefined) => () => {
    if (typeof taskId === 'number') {
      this.props.stopUserWork(taskId);
    } else {
      console.log('deleteUserWork taskId type is %s', typeof taskId);
    }
  };
}
