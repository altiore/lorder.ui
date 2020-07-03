import React, { useCallback, useMemo } from 'react';

import StartStopButton from '@components/StartStopButton';

import { ITask } from '@types';

interface Props {
  afterStop?: any;
  currentTaskId: number;
  isPaused: boolean;
  isLarge?: boolean;
  isStarted: boolean;
  onStart: (task: { projectId?: number; taskId?: number | string }) => any;
  onStartNew: any;
  onComplete: (event: React.SyntheticEvent<any>) => any;
  onCompletePaused: (...a: any) => any;
  onPause: (event: React.SyntheticEvent<any>) => any;
  task?: ITask;
  width?: number;
}

export const StartStopBtnTsx: React.FC<Props> = ({
  afterStop,
  currentTaskId,
  isPaused,
  onStart,
  onStartNew,
  onComplete,
  onCompletePaused,
  onPause,
  task,
}): JSX.Element => {
  const isCurrent = useMemo(() => {
    return task && task.id === currentTaskId;
  }, [currentTaskId, task]);

  const handleStart = useCallback(
    event => {
      event.stopPropagation();
      if (task) {
        const { id, projectId } = task;
        onStart({
          projectId,
          taskId: id,
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
      onStart({ taskId: currentTaskId });
    },
    [currentTaskId, onStart]
  );

  const handleBringBack = useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
    alert('Пока не реализовано!');
  }, []);

  return (
    <StartStopButton
      isCurrent={isCurrent}
      isPaused={isPaused}
      onBringBack={handleBringBack}
      onComplete={isCurrent ? handleComplete : undefined}
      onStart={handleStart}
      onResume={handleResume}
      onPause={handlePause}
    />
  );
};
