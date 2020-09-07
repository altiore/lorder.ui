import React, { useCallback, useMemo, useState } from 'react';
import Popover from 'react-popover';

import { makeStyles, Theme } from '@material-ui/core/styles';

import TaskDuration from '@components/task-duration';

import CurrentDurationItem from './current-duration-item';
import { UserWorkTable } from './user-work-table';

import { ITask } from '@types';

export interface ITaskDurationProps {
  currentTaskId: number | string;
  isPaused: boolean;
  getTaskById: (id: string | number) => ITask;
  taskId: number | string;
}

export const TaskDurationTsx: React.FC<ITaskDurationProps> = ({ currentTaskId, isPaused, getTaskById, taskId }) => {
  const task = useMemo(() => {
    return getTaskById(taskId);
  }, [getTaskById, taskId]);

  const isCurrent = useMemo(() => task && task.id === currentTaskId, [currentTaskId, task]);

  const [isWorkTableOpen, setIsWorkTableOpen] = useState(false);

  const onToggleOpenWorkTable = useCallback(() => setIsWorkTableOpen(st => !st), [setIsWorkTableOpen]);

  const { currentWrap, pausedStyle, userWorkTable } = useStyles();
  return (
    <Popover
      tipSize={4}
      className={userWorkTable}
      isOpen={isWorkTableOpen}
      onOuterAction={onToggleOpenWorkTable}
      body={task ? <UserWorkTable task={task} onClose={onToggleOpenWorkTable} /> : <div />}
    >
      {isCurrent ? (
        <div className={currentWrap}>
          {isPaused && <div className={pausedStyle}>на паузе:</div>}
          <CurrentDurationItem isOpen={isWorkTableOpen} hoursPerDay={24} onClick={onToggleOpenWorkTable} />
        </div>
      ) : (
        <TaskDuration
          isOpen={isWorkTableOpen}
          hoursPerDay={24}
          onClick={task && task.durationInSeconds ? onToggleOpenWorkTable : undefined}
          time={(task && task.durationInSeconds) || 0}
        />
      )}
    </Popover>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  currentWrap: {
    position: 'relative',
  },
  pausedStyle: {
    color: theme.palette.pause.main,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    textAlign: 'center',
    top: -10,
    width: 60,
  },
  userWorkTable: {
    zIndex: 1300,
  },
}));
