import React, { useCallback, useMemo, useState } from 'react';
import Popover from 'react-popover';

import { makeStyles } from '@material-ui/core/styles';

import TaskDuration from '@components/TaskDuration';

import CurrentDurationItem from './CurrentDurationItem';
import { UserWorkTable } from './UserWorkTable';

import { ITask } from '@types';

export interface ITaskDurationProps {
  currentTaskId: number | string;
  getTaskById: (id: string | number) => ITask;
  taskId: number | string;
}

export const useStyles = makeStyles(() => ({
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

  return (
    <Popover
      tipSize={4}
      className={classes.userWorkTable}
      isOpen={isWorkTableOpen}
      onOuterAction={onToggleOpenWorkTable}
      body={task ? <UserWorkTable task={task} onClose={onToggleOpenWorkTable} /> : <div />}
    >
      {isCurrent ? (
        <CurrentDurationItem isOpen={isWorkTableOpen} hoursPerDay={24} onClick={onToggleOpenWorkTable} />
      ) : (
        <TaskDuration
          isOpen={isWorkTableOpen}
          hoursPerDay={24}
          onClick={task && task.durationInSeconds ? onToggleOpenWorkTable : undefined}
          time={task.durationInSeconds || 0}
        />
      )}
    </Popover>
  );
};
