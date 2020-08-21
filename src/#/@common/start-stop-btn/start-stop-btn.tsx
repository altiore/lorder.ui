import React, { useCallback, useMemo } from 'react';

import StartStopButton from '@components/start-stop-button';

import CommentForm from './comment-form';

import { IProjectStrategyInfo, IRoleMove, ITask, TASK_STATUS_MOVE_TYPE } from '@types';

interface Props {
  afterStop?: any;
  currentTask: ITask;
  getStrategyByProjectId: (prId: number) => IProjectStrategyInfo | undefined;
  isPaused: boolean;
  isLarge?: boolean;
  isStarted?: boolean;
  onStart: (task: { projectId: number; sequenceNumber: number }) => any;
  onStartNew?: any;
  onComplete: (event: React.SyntheticEvent<any>) => any;
  onCompletePaused: (...a: any) => any;
  onPause: (event: React.SyntheticEvent<any>) => any;
  openDialog: any;
  task?: ITask;
  width?: number;
}

export const StartStopBtnTsx: React.FC<Props> = ({
  afterStop,
  currentTask,
  getStrategyByProjectId,
  isPaused,
  onStart,
  onStartNew,
  onComplete,
  onCompletePaused,
  onPause,
  openDialog,
  task,
}): JSX.Element => {
  const isCurrent = useMemo(() => {
    return task && task.id === (currentTask && currentTask.id);
  }, [currentTask, task]);

  const strategy = useMemo<undefined | IProjectStrategyInfo>(() => {
    if (task && getStrategyByProjectId) {
      return getStrategyByProjectId(task.projectId);
    }

    return undefined;
  }, [getStrategyByProjectId, task]);

  const bringBack = useMemo<IRoleMove[]>(() => {
    if (strategy && task) {
      return strategy.userRoles.reduce<IRoleMove[]>((res, userRole) => {
        userRole.columns.forEach(column => {
          if (column.statuses.includes(task.statusTypeName)) {
            const move = column.moves.find(m => m.type === TASK_STATUS_MOVE_TYPE.BRING_BACK);
            if (move) {
              res.push(move);
            }
          }
        });
        return res;
      }, []);
    }

    return [];
  }, [strategy, task]);

  const handleStart = useCallback(
    event => {
      event.stopPropagation();
      if (task) {
        const { projectId, sequenceNumber } = task;
        onStart({
          projectId,
          sequenceNumber,
        });
        return;
      } else {
        if (typeof onStartNew === 'function') {
          onStartNew();
        }
      }
    },
    [onStart, onStartNew, task]
  );

  const handlePause = useCallback(
    e => {
      e.stopPropagation();
      if (onPause) {
        onPause(e);
      }
      if (afterStop) {
        afterStop();
      }
    },
    [afterStop, onPause]
  );

  const handleComplete = useCallback(
    e => {
      e.stopPropagation();
      if (isCurrent) {
        if (isPaused) {
          onCompletePaused();
        } else {
          if (onComplete) {
            onComplete(e);
          }
        }
      } else {
        alert('Начните задачу, чтоб ее завершить!');
      }

      if (afterStop) {
        afterStop();
      }
    },
    [afterStop, isCurrent, isPaused, onComplete, onCompletePaused]
  );

  const handleResume = useCallback(
    event => {
      event.stopPropagation();
      onStart({
        projectId: currentTask.projectId,
        sequenceNumber: currentTask.sequenceNumber,
      });
    },
    [currentTask, onStart]
  );

  const handleBringBack = useCallback(
    event => {
      event.preventDefault();
      event.stopPropagation();
      if (task) {
        openDialog(CommentForm, undefined, { task });
      }
    },
    [openDialog, task]
  );

  return (
    <StartStopButton
      isCurrent={isCurrent}
      isPaused={isPaused}
      onBringBack={bringBack.length ? handleBringBack : undefined}
      onComplete={isCurrent ? handleComplete : undefined}
      onStart={handleStart}
      onResume={handleResume}
      onPause={handlePause}
    />
  );
};
