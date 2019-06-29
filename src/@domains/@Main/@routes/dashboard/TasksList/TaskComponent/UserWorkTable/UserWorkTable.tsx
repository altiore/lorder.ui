import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import ClearIcon from '@material-ui/icons/Clear';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { IDownloadList, IUserWork } from '@types';
import { StartStopBtn } from '@components/StartStopBtn';
import { Table } from '@components/Table';
import { DescriptionForm } from './DescriptionForm';
import { DurationField } from './DurationField';
import { styles } from './styles';
import { TimerCell } from './TimerCell';

export interface IUserWorkTableProps extends RouteComponentProps<{}> {
  userWorks: IDownloadList<IUserWork>;
  classes: any;
  currentUserWorkId?: number;
  deleteUserWork: any;
  onClose: any;
  projectId: number;
  stopUserWork: (arg: any) => Promise<any>;
  taskId: number;
}

export class UserWorkTableJsx1 extends React.PureComponent<IUserWorkTableProps> {
  render() {
    const { classes, onClose, userWorks } = this.props;
    if (!userWorks || !userWorks.length) {
      return null;
    }
    return (
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <IconButton onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        <Table items={userWorks} renderItem={this.renderItem as any} perPage={7}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Задача</TableCell>
              <TableCell align="center">Начало</TableCell>
              <TableCell align="center">Конец</TableCell>
              <TableCell align="center">Длилась</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
        </Table>
      </div>
    );
  }

  private renderItem = ({ id, description, startAt, finishAt, duration }: IUserWork) => {
    const { classes, currentUserWorkId, projectId, taskId } = this.props;
    const isCurrent = currentUserWorkId === id;
    return (
      <TableRow className={classes.row} key={id} hover>
        <TableCell align="left">
          <DescriptionForm
            currentUserWorkId={currentUserWorkId}
            projectId={projectId}
            taskId={taskId}
            userWorkId={id}
            initialValues={{ description }}
          />
        </TableCell>
        <TableCell align="center">{startAt && startAt.format('YYYY-MM-DD HH:mm:ss')}</TableCell>
        <TableCell align="center">{finishAt && finishAt.format('YYYY-MM-DD HH:mm:ss')}</TableCell>
        {isCurrent ? (
          <TimerCell />
        ) : (
          <TableCell align="center">
            <DurationField projectId={projectId} taskId={taskId} value={duration} userWorkId={id} />
          </TableCell>
        )}
        <TableCell align="center">
          {isCurrent ? <StartStopBtn isStarted={isCurrent} onStop={this.stopUserWork(id)} /> : null}
        </TableCell>
      </TableRow>
    );
  };

  // private deleteUserWork = (userWorkId: number | string | undefined) => () => {
  //   if (typeof userWorkId === 'number') {
  //     this.props.deleteUserWork(userWorkId);
  //   } else {
  //     throw new Error(`deleteUserWork userWorkId type is ${typeof userWorkId}`);
  //   }
  // };

  private stopUserWork = (userWorkId: number | string | undefined) => async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (typeof userWorkId === 'number') {
      await this.props.stopUserWork(userWorkId);
    } else {
      throw new Error(`deleteUserWork userWorkId type is ${typeof userWorkId}`);
    }
    this.props.onClose();
  };
}

export const UserWorkTableJsx = withStyles(styles, { withTheme: true })(UserWorkTableJsx1);
