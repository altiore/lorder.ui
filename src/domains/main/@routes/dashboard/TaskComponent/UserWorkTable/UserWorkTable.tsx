import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ClearIcon from '@material-ui/icons/Clear';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { IDownloadList, IUserWork } from 'src/@types';
import { StartStopBtn } from 'src/components/StartStopBtn';
import { Table } from 'src/components/Table';
import { DescriptionForm } from './DescriptionForm';
import { DurationField } from './DurationField';
import { styles } from './styles';
import { TimerCell } from './TimerCell';

export interface IUserWorkTableProps extends RouteComponentProps<{}> {
  userWorks: IDownloadList<IUserWork>;
  classes: any;
  currentUserWorkId?: number;
  deleteUserWork: any;
  projectId: number;
  stopUserWork: any;
  taskId: number;
}

export class UserWorkTableJsx1 extends React.PureComponent<IUserWorkTableProps> {
  render() {
    const { classes, userWorks } = this.props;
    if (!userWorks || !userWorks.length) {
      return null;
    }
    return (
      <div className={classes.wrapper}>
        <Table items={userWorks} renderItem={this.renderItem} perPage={7}>
          <TableHead>
            <TableRow>
              <TableCell>Задача</TableCell>
              <TableCell numeric>Начало</TableCell>
              <TableCell numeric>Конец</TableCell>
              <TableCell numeric>Длилась</TableCell>
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
        <TableCell>
          <DescriptionForm
            currentUserWorkId={currentUserWorkId}
            projectId={projectId}
            taskId={taskId}
            userWorkId={id}
            initialValues={{ description }}
          />
        </TableCell>
        <TableCell>{startAt && startAt.format('YYYY-MM-DD HH:mm:ss')}</TableCell>
        <TableCell>{finishAt && finishAt.format('YYYY-MM-DD HH:mm:ss')}</TableCell>
        {isCurrent ? (
          <TimerCell />
        ) : (
          <TableCell numeric>
            <DurationField projectId={projectId} taskId={taskId} value={duration} userWorkId={id} />
          </TableCell>
        )}
        <TableCell numeric>
          {isCurrent ? (
            <StartStopBtn isStarted={isCurrent} onStop={this.stopUserWork(id)} />
          ) : (
            <IconButton onClick={this.deleteUserWork(id)}>
              <ClearIcon />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
    );
  };

  private deleteUserWork = (userWorkId: number | string | undefined) => () => {
    if (typeof userWorkId === 'number') {
      this.props.deleteUserWork(userWorkId);
    } else {
      console.log('deleteUserWork userWorkId type is %s', typeof userWorkId);
    }
  };

  private stopUserWork = (userWorkId: number | string | undefined) => (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (typeof userWorkId === 'number') {
      this.props.stopUserWork(userWorkId);
    } else {
      console.log('deleteUserWork userWorkId type is %s', typeof userWorkId);
    }
  };
}

export const UserWorkTableJsx = withStyles(styles, { withTheme: true })(UserWorkTableJsx1);
