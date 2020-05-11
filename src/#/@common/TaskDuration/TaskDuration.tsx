import React, { useCallback, useMemo, useState } from 'react';
import Popover from 'react-popover';

import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import CurrentDurationItem from './CurrentDurationItem';
import { UserWorkTable } from './UserWorkTable';

import { ITask } from '@types';

export interface ITaskDurationProps {
  currentTaskId: number | string;
  getTaskById: (id: string | number) => ITask;
  taskId: number | string;
}

export const useStyles = makeStyles((theme: Theme) => ({
  duration: {
    '& > button': {
      padding: theme.spacing(0.75, 0),
      width: '100%',
    },
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      // display: 'inline-block',
    },
  },
  userWorkTable: {
    zIndex: 1300,
  },
}));

export const TaskDurationTsx: React.FC<ITaskDurationProps> = ({ currentTaskId, getTaskById, taskId }) => {
  const classes = useStyles();

  const task = useMemo(() => {
    return getTaskById(taskId);
  }, [getTaskById, taskId]);

  const isCurrent = useMemo(() => task && task.id === currentTaskId, [currentTaskId, task]);

  const [isWorkTableOpen, setIsWorkTableOpen] = useState(false);

  const onToggleOpenWorkTable = useCallback(() => setIsWorkTableOpen(st => !st), [setIsWorkTableOpen]);

  const didNotTouched = task.duration === '00:00';

  return (
    <Popover
      tipSize={4}
      className={classes.userWorkTable}
      isOpen={isWorkTableOpen}
      onOuterAction={onToggleOpenWorkTable}
      body={task ? <UserWorkTable task={task} onClose={onToggleOpenWorkTable} /> : <div />}
    >
      <div className={classes.duration}>
        {isCurrent ? (
          <CurrentDurationItem isOpen={isWorkTableOpen} onClick={onToggleOpenWorkTable} />
        ) : (
          <Tooltip
            placement={'right'}
            title={
              didNotTouched
                ? 'Вы пока не работали над этой задачей'
                : isWorkTableOpen
                ? 'Закрыть подробности'
                : 'Нажмите, чтоб раскрыть подробности'
            }
          >
            <Button onClick={task.duration === '00:00' ? undefined : onToggleOpenWorkTable}>{task.duration}</Button>
          </Tooltip>
        )}
      </div>
    </Popover>
  );
};
