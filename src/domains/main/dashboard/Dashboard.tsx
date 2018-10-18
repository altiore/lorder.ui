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
import { UserTask } from 'src/store/user-tasks';
import { StartForm } from './StartForm';
import { TimerCell } from './TimerCell';

export interface IDashboardProps extends RouteComponentProps<{}> {
  allUserTasks: DownloadList<UserTask>;
  classes: any;
  currentTaskId?: number;
  deleteUserTask: any;
  isTimerStarted: boolean;
  getAllUserTasks: any;
  selectedProjectId: number;
  startTimer: any;
  stopUserTask: any;
}

export class DashboardJsx extends React.PureComponent<IDashboardProps> {
  public componentDidMount() {
    const { getAllUserTasks, selectedProjectId } = this.props;
    if (selectedProjectId) {
      getAllUserTasks(selectedProjectId);
    }
  }

  /**
   * TODO: move to persist first rehydrate place instead of this component,
   *       because we should start timer even if reload any other page
   */
  public componentWillReceiveProps(nextProps: IDashboardProps) {
    if (
      nextProps.allUserTasks !== this.props.allUserTasks &&
      nextProps.isTimerStarted === this.props.isTimerStarted &&
      !nextProps.isTimerStarted &&
      nextProps.allUserTasks.list[0] &&
      !nextProps.allUserTasks.list[0].finishAt
    ) {
      const userTask = nextProps.allUserTasks.list[0];
      this.props.startTimer(userTask);
    }
  }

  public render() {
    const { allUserTasks } = this.props;
    return (
      <Page>
        <StartForm />
        {allUserTasks &&
          !!allUserTasks.length && (
            <Table items={allUserTasks} renderItem={this.renderItem}>
              <TableHead>
                <TableRow>
                  <TableCell>Описание</TableCell>
                  <TableCell numeric>Время</TableCell>
                  <TableCell numeric />
                </TableRow>
              </TableHead>
            </Table>
          )}
      </Page>
    );
  }

  private renderItem = ({ id, description, duration }: UserTask) => {
    const { classes, currentTaskId } = this.props;
    return (
      <TableRow className={classes.row} key={id} hover>
        <TableCell>{description}</TableCell>
        {currentTaskId === id ? <TimerCell /> : <TableCell numeric>{duration}</TableCell>}
        <TableCell numeric>
          {currentTaskId === id ? (
            <IconButton onClick={this.stopUserTask(id)} className={classes.stop}>
              <StopIcon />
            </IconButton>
          ) : (
            <IconButton onClick={this.deleteUserTask(id)}>
              <ClearIcon />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
    );
  };

  private deleteUserTask = (taskId: number | string | undefined) => () => {
    if (typeof taskId === 'number') {
      this.props.deleteUserTask(taskId);
    } else {
      console.log('deleteUserTask taskId type is %s', typeof taskId);
    }
  };

  private stopUserTask = (taskId: number | string | undefined) => () => {
    if (typeof taskId === 'number') {
      this.props.stopUserTask(taskId);
    } else {
      console.log('deleteUserTask taskId type is %s', typeof taskId);
    }
  };
}
