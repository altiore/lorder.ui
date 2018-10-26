import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ClearIcon from '@material-ui/icons/Clear';
import StopIcon from '@material-ui/icons/StopRounded';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Table } from 'src/domains/@common/Table';
import { DownloadList } from 'src/store/@common/entities';
import { UserWork } from 'src/store/tasks';
import { TimerCell } from '../TimerCell';

export interface IUserWorkTableProps extends RouteComponentProps<{}> {
  userWorks: DownloadList<UserWork>;
  classes: any;
  currentTaskId?: number;
  deleteUserWork: any;
  stopUserWork: any;
}

export class UserWorkTableJsx extends React.PureComponent<IUserWorkTableProps> {
  public render() {
    const { userWorks } = this.props;
    if (!userWorks || !userWorks.length) {
      return null;
    }
    return <Table items={userWorks} renderItem={this.renderItem} perPage={5} />;
  }

  private renderItem = ({ id, description, duration }: UserWork) => {
    const { classes, currentTaskId } = this.props;
    return (
      <TableRow className={classes.row} key={id} hover>
        <TableCell>{description}</TableCell>
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
