import React, { useCallback, useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import ClearIcon from '@material-ui/icons/Clear';
import CloseIcon from '@material-ui/icons/Close';

import { StartStopBtn } from '@components/StartStopBtn';
import { Table } from '@components/Table';

// import { DescriptionForm } from './DescriptionForm';
import { DurationField } from './DurationField';
import { useStyles } from './styles';
import { TimerCell } from './TimerCell';

import { ITask, IUserWork } from '@types';

export interface IUserWorkTableProps extends RouteComponentProps<{}> {
  currentUserWorkId?: number;
  deleteUserWork?: any;
  getUserWorksByTaskId: any;
  getUserWorksBySequenceNumber: any;
  onClose: any;
  stopUserWork: (arg: any) => Promise<any>;
  task: ITask;
}

export const UserWorkTableJsx: React.FC<IUserWorkTableProps> = ({
  currentUserWorkId,
  getUserWorksByTaskId,
  getUserWorksBySequenceNumber,
  onClose,
  stopUserWork,
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

  const handleStopUserWork = useCallback(
    (userWorkId: number | string | undefined) => async (e: React.SyntheticEvent) => {
      e.stopPropagation();
      if (typeof userWorkId === 'number') {
        await stopUserWork(userWorkId);
      } else {
        throw new Error(`deleteUserWork userWorkId type is ${typeof userWorkId}`);
      }
      onClose();
    },
    [onClose, stopUserWork]
  );

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
            {isCurrent ? <StartStopBtn isStarted={isCurrent} onStop={handleStopUserWork(id)} /> : null}
          </TableCell>
        </TableRow>
      );
    },
    [classes, currentUserWorkId, handleStopUserWork, task]
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
