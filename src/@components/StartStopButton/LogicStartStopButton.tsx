import React, { useCallback, useMemo } from 'react';

import { StartStopButton } from './StartStopButton';

import { ITask } from '@types';

interface ILogicStartStopButton {
  currentTaskId: number;
  isPaused: boolean;

  task?: ITask;

  onPause: (event: React.SyntheticEvent<any>) => void;
  onStart: (task: { projectId?: number; taskId?: number | string }) => void;
  onStop: (event: React.SyntheticEvent<any>) => void;
  onStopPaused: () => void;
  // todo колбэк что задача завершена
}

export const LogicStartStopButton: React.FC<ILogicStartStopButton> = ({
  currentTaskId,
  isPaused,

  task,

  onPause,
  onStart,
  onStop,
  onStopPaused,
}) => {
  const isCurrent = useMemo(() => {
    return currentTaskId && task && currentTaskId === task.id;
  }, [currentTaskId, task]) as boolean;

  console.log(isPaused);
  console.log(isCurrent);

  const handleClickCenter = useCallback(
    e => {
      e.stopPropagation();

      if (isCurrent) {
        if (isPaused) {
          const { id, projectId } = task!;
          onStart({
            projectId,
            taskId: id,
          });
        } else {
          onPause(e);
        }
      } else {
        const { id, projectId } = task!;
        onStart({
          projectId,
          taskId: id,
        });
      }
    },
    [isCurrent, isPaused, onStart, onStopPaused, onPause]
  );

  // todo Задача вернули обратно
  const onRollback = () => {
    alert('Задача вернули обратно');
  };

  if (!task) {
    return null;
  }

  return (
    <StartStopButton
      isPaused={isPaused}
      isCurrent={isCurrent}
      onClickCenter={handleClickCenter}
      onClickLeft={onRollback}
      onClickRight={onStop}
    />
  );
};
