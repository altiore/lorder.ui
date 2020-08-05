import React, { useCallback, useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CloseIcon from '@material-ui/icons/Close';

import { Table } from '@components/table';

import StartStopBtn from '#/@common/start-stop-btn';

import { DurationField } from './duration-field';
import { useStyles } from './styles';
import { TimerCell } from './timer-cell';

import { ITask, IUserWork } from '@types';

export interface IUserWorkTableProps extends RouteComponentProps<{}> {
  currentUserWorkId?: number;
  deleteUserWork?: any;
  getUserWorksByTaskId: any;
  getUserWorksBySequenceNumber: any;
  onClose: any;
  task: ITask;
}

export const UserWorkTableJsx: React.FC<IUserWorkTableProps> = ({
  currentUserWorkId,
  getUserWorksByTaskId,
  getUserWorksBySequenceNumber,
  onClose,
  task,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getUserWorksBySequenceNumber(task.projectId, task.sequenceNumber);
  }, [getUserWorksBySequenceNumber, task]);

  const userWorks: IUserWork[] = useMemo(() => {
    if (task) {
      return getUserWorksByTaskId(task.id);
    }
    return [];
  }, [getUserWorksByTaskId, task]);

  const renderItem = useCallback(
    ({ id, startAt, finishAt, duration }: IUserWork) => {
      const isCurrent = currentUserWorkId === id;
      return (
        <TableRow className={classes.row} key={id} hover>
          <TableCell size="small" align="center">
            {startAt && startAt.format('YYYY-MM-DD HH:mm:ss')}
          </TableCell>
          <TableCell size="small" align="center">
            {finishAt && finishAt.format('YYYY-MM-DD HH:mm:ss')}
          </TableCell>
          {isCurrent ? (
            <TimerCell size="small" />
          ) : (
            <TableCell size="small" align="center">
              <DurationField projectId={task.projectId} taskId={task.id} value={duration} userWorkId={id} />
            </TableCell>
          )}
          <TableCell size="small" align="center">
            {isCurrent ? <StartStopBtn afterStop={onClose} /> : null}
          </TableCell>
        </TableRow>
      );
    },
    [classes, currentUserWorkId, onClose, task]
  );

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
      <Table items={userWorks} renderItem={renderItem as any} perPage={10}>
        <TableHead>
          <TableRow>
            <TableCell size="small" align="center">
              Начало
            </TableCell>
            <TableCell size="small" align="center">
              Конец
            </TableCell>
            <TableCell size="small" align="center">
              Длительность
            </TableCell>
            <TableCell size="small" />
          </TableRow>
        </TableHead>
      </Table>
    </div>
  );
};
