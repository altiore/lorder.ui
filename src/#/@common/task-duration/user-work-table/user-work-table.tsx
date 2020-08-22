import React, { useCallback, useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import moment from 'moment';

import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CloseIcon from '@material-ui/icons/Close';

import { Table } from '@components/table';

import { UI_PROP } from '#/@store/ui';

import { DurationField } from './duration-field';
import { useStyles } from './styles';
import { TimerCell } from './timer-cell';

import { ITask, IUserWork } from '@types';

export interface IUserWorkTableProps extends RouteComponentProps<{}> {
  changeCustomRange: (range: [moment.Moment, moment.Moment], uwId: number) => void;
  currentUserWorkId?: number;
  deleteUserWork?: any;
  getUserWorksByTaskId: any;
  getUserWorksBySequenceNumber: any;
  onClose: any;
  task: ITask;
  toggleUiSetting: any;
}

export const UserWorkTableJsx: React.FC<IUserWorkTableProps> = ({
  changeCustomRange,
  currentUserWorkId,
  getUserWorksByTaskId,
  getUserWorksBySequenceNumber,
  onClose,
  task,
  toggleUiSetting,
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

  const handleRowClick = useCallback(
    evt => {
      const idStr = evt?.currentTarget?.dataset?.id;
      if (idStr) {
        const id = parseInt(idStr, 0);
        const curUserWork = userWorks.find(el => el.id === id);
        if (curUserWork) {
          onClose();
          toggleUiSetting(UI_PROP.TIME_EDIT);
          changeCustomRange([curUserWork.startAt.clone().startOf('day'), curUserWork.startAt.clone().endOf('day')], id);
        }
      }
    },
    [changeCustomRange, onClose, toggleUiSetting, userWorks]
  );

  const renderItem = useCallback(
    ({ id, startAt, finishAt, duration }: IUserWork) => {
      const isCurrent = currentUserWorkId === id;
      return (
        <TableRow className={classes.row} key={id} hover onClick={handleRowClick} data-id={id}>
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
        </TableRow>
      );
    },
    [classes, currentUserWorkId, handleRowClick, task]
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
