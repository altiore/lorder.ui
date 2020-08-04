import React, { useCallback, useMemo } from 'react';

import StartStopButton from '@components/StartStopButton';

import { ITask } from '@types';

interface Props {
  afterStop?: any;
  currentTask: ITask;
  isPaused: boolean;
  isLarge?: boolean;
  isStarted: boolean;
  onStart: (task: { projectId: number; sequenceNumber: number }) => any;
  onStartNew: any;
  onComplete: (event: React.SyntheticEvent<any>) => any;
  onCompletePaused: (...a: any) => any;
  onPause: (event: React.SyntheticEvent<any>) => any;
  task?: ITask;
  width?: number;
}

export const StartStopBtnTsx: React.FC<Props> = ({
  afterStop,
  currentTask,
  isPaused,
  onStart,
  onStartNew,
  onComplete,
  onCompletePaused,
  onPause,
  task,
}): JSX.Element => {
  const isCurrent = useMemo(() => {
    return task && task.id === (currentTask && currentTask.id);
  }, [currentTask, task]);

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
